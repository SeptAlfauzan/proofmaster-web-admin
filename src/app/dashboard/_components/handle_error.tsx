import { Button, Card, Text } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";

type HandleErrorType = {
  error: any;
  onRefresh: () => void;
};
const HandleError: React.FC<HandleErrorType> = ({ error, onRefresh }) => {
  return (
    <Card p={4}>
      <Text>Error: {error}</Text>
      <Button rightIcon={<MdRefresh />} onClick={onRefresh}>
        Refresh
      </Button>
    </Card>
  );
};

export default HandleError;
