
export interface BucketListItem {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  photo: boolean;
  addedBy: string;
  addedDate: string;
  completedBy?: string;
  completedDate?: string;
}
