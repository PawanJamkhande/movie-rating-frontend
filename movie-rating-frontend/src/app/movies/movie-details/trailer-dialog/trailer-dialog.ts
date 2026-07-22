import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.html',
  styleUrl: './trailer-dialog.css'
})
export class TrailerDialog {

  trailerUrl!: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { trailerUrl: string },
    private dialogRef: MatDialogRef<TrailerDialog>,
    private sanitizer: DomSanitizer
  ) {
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.getEmbedUrl(data.trailerUrl)
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  private getEmbedUrl(url: string): string {

    if (!url) {
      return '';
    }

    let videoId = '';

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }

    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

}
