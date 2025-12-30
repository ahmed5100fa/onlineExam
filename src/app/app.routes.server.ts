import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },{
    path: 'home/exams/:id',
    renderMode: RenderMode.Server
  },{
    path: 'home/questions/:id',
    renderMode: RenderMode.Server
  }
];
