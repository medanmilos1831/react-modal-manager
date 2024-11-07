import { ModalService } from './ModalService';

export class OverlayService {
  overlays: any = {};
  constructor(overlays: any[]) {
    overlays.forEach((overlay: any) => {
      this.overlays[overlay.elementName] = new ModalService();
    });
  }
}
