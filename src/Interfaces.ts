export interface Section{
    id:number;
    name:string;
}

export interface YouTubeVideo {
  title: string;
  imageUrl: string;
  videoUrl: string;
}

export interface GitHubLink {
  title: string;
  url: string;
}

export interface ResourceItem {
  id: number;
  createdAt: string;
  youTubeVideos: YouTubeVideo[];
  gthub: GitHubLink[];
  aiText:string|null;
  title: string;
  file: string;
  sectionId: number;
  type: string;
  description: string;
}
