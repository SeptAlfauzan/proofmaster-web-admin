import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { MutableRefObject, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelref: MutableRefObject<null>;
  componentsActions: ReactNode;
  title: string;
  text: string;
};

const Dialog: React.FC<Props> = ({
  isOpen,
  onClose,
  cancelref,
  componentsActions,
  title,
  text,
}) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelref}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {title}
        </AlertDialogHeader>

        <AlertDialogBody>{text}</AlertDialogBody>

        <AlertDialogFooter>{componentsActions}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

export default Dialog;
