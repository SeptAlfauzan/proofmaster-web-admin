import React from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

const Page = () => {
  return (
    <Box maxWidth="800px" margin="auto" padding={6}>
      <Heading as="h1" size="xl" mb={4}>
        Privacy Policy
      </Heading>
      <Text mb={4}>Last updated: October 02, 2024</Text>

      <Text mb={4}>
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </Text>

      <Text mb={4}>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy. This Privacy Policy has been
        created with the help of the{" "}
        <Link
          color="blue.500"
          href="https://www.termsfeed.com/privacy-policy-generator/"
          isExternal
        >
          Privacy Policy Generator
        </Link>
        .
      </Text>

      <Heading as="h2" size="lg" mt={6} mb={4}>
        Interpretation and Definitions
      </Heading>

      <Heading as="h3" size="md" mt={4} mb={2}>
        Interpretation
      </Heading>
      <Text mb={4}>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Text>

      <Heading as="h3" size="md" mt={4} mb={2}>
        Definitions
      </Heading>
      <Text mb={2}>For the purposes of this Privacy Policy:</Text>
      <UnorderedList mb={4}>
        <ListItem>
          <strong>Account</strong> means a unique account created for You to
          access our Service or parts of our Service.
        </ListItem>
        <ListItem>
          <strong>Affiliate</strong> means an entity that controls, is
          controlled by or is under common control with a party, where{" "}
          {"control"}
          means ownership of 50% or more of the shares, equity interest or other
          securities entitled to vote for election of directors or other
          managing authority.
        </ListItem>
        <ListItem>
          <strong>Application</strong> refers to Proof Master, the software
          program provided by the Company.
        </ListItem>
        {/* Add more list items for other definitions */}
      </UnorderedList>

      {/* Continue with other sections of the privacy policy */}

      <Heading as="h2" size="lg" mt={6} mb={4}>
        Contact Us
      </Heading>
      <Text>
        If you have any questions about this Privacy Policy, You can contact us:
      </Text>
      <UnorderedList>
        <ListItem>By email: alfauzansepta@gmail.com</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Page;
