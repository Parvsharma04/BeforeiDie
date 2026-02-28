# Before I Die — Technical Architecture

This document describes the core entities, data models, and primary application flows for the Before I Die application.

## 1. Entities & Data Models

The system is backed by a PostgreSQL / SQLite database managed by **Prisma ORM**.

### `User`
Manages authentication, profiles, and relationships to all user-generated content.
- **Fields**: `id`, `email`, `password` (hashed), `name`, `bio`, `avatar`, timestamps.
- **Relations**: Has many `List`, `Activity`.

### `List` (Journal/Bucket List)
A thematic collection of aspirations or goals.
- **Fields**: `id`, `title`, `description`, `emoji`, `category`, `visibility` (private/public).
- **Relations**: Belongs to `User`. Has many `ListItem`, `Activity`.

### `ListItem` (Aspiration/Goal)
An individual item within a list.
- **Fields**: `id`, `text`, `completed` (boolean), `completedAt`, `priority`, `notes`, `order`.
- **Relations**: Belongs to `List`.

### `Activity` (System Events & Thoughts)
A generic chronological ledger for the user. It powers the "Stored Notes", "Thoughts", and timeline events.
- **Fields**: 
  - `id`, `createdAt`
  - `type`: Categorizes the event (e.g., `'created_list'`, `'completed_item'`, `'thought'`).
  - `message`: The actual text payload (e.g., the user's private reflection or the system message).
- **Relations**: Belongs to `User`. Optionally belongs to `List`.

---

## 2. Core Application Flows

### 1. Authentication & Session Flow
The application uses pure JWT (JSON Web Tokens) for stateless sessions.
1. **Client**: The React app (Next.js) submits the login form (email/password) to `POST /auth/login`.
2. **Server**: NestJS verifies credentials via `bcrypt`, generates a JWT signing the `userId`, and returns the token.
3. **Client**: Zustand (`useAuthStore`) saves the token to `localStorage` and memory.
4. **Client Requests**: An Axios interceptor automatically prepends `Authorization: Bearer <token>` to all outgoing requests to `/api/*`.

### 2. "Write a Thought" / Private Notes Flow
Users can quickly capture deeply personal reflections on their Dashboard without tying them to a specific bucket list.
1. **UI Trigger**: User clicks "Write a thought" in the Dashboard Sidebar, opening a modal.
2. **Submission**: User types a reflection. React calls `api.post('/activities/thought', { text })`.
3. **API Processing**: The NestJS `ActivitiesController` receives the request. The `ActivitiesService` creates a new `Activity` record in Prisma with `type = 'thought'` and `message = text`.
4. **UI Update**: Tanstack Query invalidates the `['thoughts']` query cache. The Dashboard silently refetches `GET /activities?limit=50` and filters for `type === 'thought'`, instantly displaying the newly stored note on the screen.

### 3. Deleting a Stored Note
1. **Action**: User hovers over a note in the "Stored Notes" section and clicks "Delete".
2. **API Request**: React calls `DELETE /activities/:id`.
3. **Validation**: NestJS verifies the `Activity` belongs to the requesting `User` (via JWT `userId` matching `activity.userId`).
4. **Execution**: Prisma deletes the record, and the frontend cache is invalidated.

### 4. Memories Timeline Flow
When a user finishes an aspiration, it becomes a memory.
1. **Completion**: A user checks off an item. `PATCH /lists/:listId/items/:itemId` is called with `{ completed: true }`.
2. **DB Reflection**: Prisma sets `completed = true` and generates a `completedAt` timestamp.
3. **Timeline UI**: The Progress/Memories page calls `GET /users/memories`, which fetches all `ListItem` rows where `completed = true`, sorted by `completedAt` descending.
