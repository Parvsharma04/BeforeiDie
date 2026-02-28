import { IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class CreateListDto {
    @IsString()
    @MinLength(1)
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    emoji?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsEnum(['private', 'friends', 'public'])
    visibility?: string;
}

export class UpdateListDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    emoji?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsEnum(['private', 'friends', 'public'])
    visibility?: string;
}

export class CreateItemDto {
    @IsString()
    @MinLength(1)
    text!: string;

    @IsOptional()
    @IsEnum(['low', 'medium', 'high'])
    priority?: string;
}

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    text?: string;

    @IsOptional()
    completed?: boolean;

    @IsOptional()
    @IsEnum(['low', 'medium', 'high'])
    priority?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    photo?: boolean;

    @IsOptional()
    @IsString()
    reflection?: string;
}
