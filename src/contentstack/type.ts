interface Base {
  uid: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  _version: number;
  tags: string[];
}

interface Asset extends Base {
  content_type: string;
  file_size: string;
  filename: string;
  parent_uid: string | null;
  is_dir: boolean;
  title: string;
  url: string;
}

type Leaf = {
  text: string;
} | Record<string, any>

type Block = {
  type: string;
  attrs ?: Record<string, any>;
  children: (Leaf | Block)[]
} | Record<string, any>;

export type Link = {
  title: string;
  href: string;
};
export type RTE = Block;
export type File = Asset;

export interface Entry extends Base {
  locale: string;
}