"use client";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

interface InputFileProps {
  onChange: (file: File) => void;
  fileType: string;
}

const InputFile: React.FC<InputFileProps> = ({ onChange, fileType }) => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      setFile(file);
    }
  };
  return (
    <Box
      height={224}
      position={"relative"}
      border="1px"
      rounded={"lg"}
      borderStyle={"dashed"}
      background={file ? "blue.100" : undefined}
    >
      <Input
        ref={ref}
        accept={fileType}
        type="file"
        width={"100%"}
        height={"100%"}
        opacity={0}
        zIndex={2}
        onChange={handleFileChange}
      />
      <Box
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        bottom={0}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {file ? (
          <Box mb={4} alignItems={"center"} display={"flex"} flexDir={"column"}>
            <Text>{file.name}</Text>
            <Text>file size: {file.size}</Text>
          </Box>
        ) : (
          <Box mb={4} alignItems={"center"} display={"flex"} flexDir={"column"}>
            <MdOutlineCloudUpload size={40} />
            <Text>Drag and Drop here</Text>
            <Text>Or</Text>
          </Box>
        )}
        <Button
          colorScheme="blue"
          zIndex={3}
          onClick={() => ref.current?.click()}
        >
          Select File
        </Button>
      </Box>
    </Box>
  );
};

export default InputFile;
