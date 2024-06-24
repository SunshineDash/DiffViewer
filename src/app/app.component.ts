import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';

import { FileApiService } from './+shared/services/file-api.service';
import { FileDiffViewerComponent } from  './file-diff-viewer/file-diff-viewer.component';
import { FileModel } from './+shared/models/file.model';
import { FILE_NAMES } from './+shared/constants/public-file-names.const';
import { ObserverComponent } from './+shared/abstract/observer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileDiffViewerComponent],
  providers: [FileApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends ObserverComponent implements OnInit {
  firstFile = new FileModel();
  secondFile = new FileModel();

  constructor(private apiService: FileApiService) {
    super();
  }

  ngOnInit(): void {
    this.fetchFiles();
  }

  private fetchFiles(): void {
    this.subscriptions.push(
      forkJoin([
        this.apiService.getFile(FILE_NAMES[0]),
        this.apiService.getFile(FILE_NAMES[1])
      ]).pipe(
        map(([firstFile, secondFile]) => {
          return {
            firstFile: {
              name: FILE_NAMES[0],
              content: firstFile
            } as FileModel,
            secondFile: {
             name: FILE_NAMES[1],
              content: secondFile
            } as FileModel,
          };
        })
      ).subscribe(x => {
          this.firstFile = x.firstFile;
          this.secondFile = x.secondFile;
      })
    );
  }
}
