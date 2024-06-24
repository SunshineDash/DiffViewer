import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FileApiService } from './file-api.service';

describe('FileApiService', () => {
  let service: FileApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileApiService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FileApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFile', () => {
    const mockFileContent = '<file>Content</file>';
    const fileId = 'test-file-id';

    it('should return file content when getFile is called', () => {
      service.getFile(fileId).subscribe((content) => {
        expect(content).toEqual(mockFileContent);
      });

      const req = httpMock.expectOne(fileId);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Content-Type')).toBe('text/xml');
      req.flush(mockFileContent);
    });

    it('should handle HTTP error', () => {
      const errorMessage = '404 error';
      const spy = spyOn(service as any, 'handleError').and.callThrough();

      service.getFile(fileId).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne(fileId);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });

      expect(spy).toHaveBeenCalledWith(jasmine.any(HttpErrorResponse as any) as any);
    });
  });

  describe('handleError', () => {
    it('should log error to console', () => {
      const consoleSpy = spyOn(console, 'error');
      const mockErrorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found'
      });

      service['handleError'](mockErrorResponse);

      expect(consoleSpy).toHaveBeenCalledWith('404 - Not Found' as any);
    });
  });
});
