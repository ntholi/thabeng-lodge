import { Resource } from '../../admin-core/repository/repository';

export interface Article extends Resource {
  title: string;
  slug: string;
  caption: string;
  body: string;
  image: string;
  published: boolean;
  publishedAt: Date | null;
}
