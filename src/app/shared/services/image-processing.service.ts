import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandel } from '@shared/components/input-formly-custom/formly-field-input';

@Injectable({
    providedIn: 'root'
})
export class ImageProcessingService {

    constructor(private sanitizer: DomSanitizer) { }

    public createImages(product: any) {
        const productImages: any[] = product.animalImage;

        const productImagesToFileHandle: FileHandel[] = [];

        for (let i = 0; i < productImages.length; i++) {
            const imageFileData = productImages[i];
            const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
            const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

            const finalFileHandel: FileHandel = {
                file: imageFile,
                url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
            };

            productImagesToFileHandle.push(finalFileHandel);
        }
        product.animalImage = productImagesToFileHandle;
        return product;
    }

    public dataURItoBlob(picBytes: any, imageType: any) {
        const byteString = window.atob(picBytes);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([int8Array], { type: imageType });
        return blob;

    }

}
