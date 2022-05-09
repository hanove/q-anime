import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( (m) => m.DetailsPageModule)
  }, 
  {
    path: "sort",
    loadChildren: () =>
      import("./pages/sort/sort.module").then((m) => m.SortPageModule),
  },
  {
    path: "tabs/tab2/:genres",
    loadChildren: () => import('./tab2/tab2.module').then((m) => m.Tab2PageModule),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
