import Modal from "./components/modal";
import SharedModal from "./components/sharedModal";

import { variants } from "./utilities/animationVariants";
import downloadPhoto from "./utilities/downloadPhoto";
import getBase64ImageUrl from "./utilities/generateBlurPlaceholder";
import { range } from "./utilities/range";
import { useLastViewedPhoto } from "./utilities/useLastViewedPhoto";

export { Modal, SharedModal, variants, downloadPhoto, getBase64ImageUrl, range, useLastViewedPhoto };