import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Article } from './Article';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class ArticleRepository extends FirebaseRepository<Article> {
  constructor() {
    super('articles');
  }

  create(resource: ResourceCreate<Article>): Promise<Article> {
    const slug = slugify(resource.title);
    return super.create({ ...resource, slug, published: false });
  }

  update(id: string, resource: Omit<Article, 'id'>): Promise<Article> {
    const slug = slugify(resource.title);
    return super.update(id, { ...resource, slug });
  }

  async getPublished(): Promise<Article[]> {
    const ref = collection(db, this.collectionName);
    const q = query(
      ref,
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    return await this.getDocs(q);
  }

  async updatePublishStatus(id: string, published: boolean) {
    const docRef = this.docRef(id);
    await updateDoc(docRef, {
      published,
      publishedAt: published ? serverTimestamp() : null,
    });
  }
}

function slugify(title: string) {
  return title.toLowerCase().replace(/\s/g, '-');
}

export const articleRepository = new ArticleRepository();
