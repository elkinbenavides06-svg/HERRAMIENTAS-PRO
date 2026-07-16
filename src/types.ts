/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolCategory =
  | 'pdf'
  | 'calculadoras'
  | 'conversores'
  | 'texto'
  | 'imagenes'
  | 'desarrolladores';

export interface FAQItem {
  q: string;
  a: string;
}

export interface ExampleItem {
  input: string;
  output: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  seoTitle: string;
  seoDescription: string;
  guide: string[];
  faqs: FAQItem[];
  examples?: ExampleItem[];
  related: string[]; // List of related tool IDs
  keywords: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  relatedTools: string[];
}
