import NiceModal from "@ebay/nice-modal-react";

import { ModalCreateProduct } from "../Orders/views/Menu/components";

export enum RegisteredModals {
  ModalCreateProduct = "ModalCreateProduct",
}

NiceModal.register(RegisteredModals.ModalCreateProduct, ModalCreateProduct);
