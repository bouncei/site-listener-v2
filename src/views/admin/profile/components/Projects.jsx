// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
import Project1 from "img/profile/Project1.png";
import Project2 from "img/profile/Project2.png";
import Project3 from "img/profile/Project3.png";
// Custom components
import Card from "components/card/Card";
import Project from "views/admin/profile/components/Project";
import { NewWebsite } from "components/modals";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useAuth } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { getWebsitesforSingleUser } from "utils/functions";
import NFT from "components/card/NFT";

// Assets
import Nft1 from "img/nfts/Nft1.png";
import Nft2 from "img/nfts/Nft2.png";
import Nft3 from "img/nfts/Nft3.png";
import Nft4 from "img/nfts/Nft4.png";
import Nft5 from "img/nfts/Nft5.png";
import Nft6 from "img/nfts/Nft6.png";
import Avatar1 from "img/avatars/avatar1.png";
import Avatar2 from "img/avatars/avatar2.png";
import Avatar3 from "img/avatars/avatar3.png";
import Avatar4 from "img/avatars/avatar4.png";

export default function Projects(props) {
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [r, setR] = useState(false);
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const getWebsites = useCallback(async () => {
    const data = await getWebsitesforSingleUser(user?._id);
    console.log("Website Information on profile view", data);
    setWebsites(data.data);
  }, [r]);

  useEffect(() => {
    if (!user) return;
    getWebsites();
  }, [user]);

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <HStack justifyContent={"space-between"}>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          All Websites
        </Text>
        <Button
          me="100%"
          mb="50px"
          w={{ base: "50", "2xl": "80px" }}
          minW={{ base: "50", "2xl": "80px" }}
          mt={{ base: "20px", "2xl": "auto" }}
          variant="brand"
          className="flex "
          fontWeight="500"
          _hover={{ opacity: "80%" }}
          onClick={onOpen}
        >
          <span>
            <HiOutlineDocumentAdd className="text-xl" />{" "}
          </span>
          {"  "}
          New
        </Button>
      </HStack>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Here you can find more details about your projects. Keep you user
        engaged by providing meaningful information.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
        <NFT
          name="Abstract Colors"
          author="By Esthera Jackson"
          bidders={[
            Avatar1,
            Avatar2,
            Avatar3,
            Avatar4,
            Avatar1,
            Avatar1,
            Avatar1,
            Avatar1,
          ]}
          image={Nft1}
          currentbid="0.91 ETH"
          download="#"
        />
        <NFT
          name="ETH AI Brain"
          author="By Nick Wilson"
          bidders={[
            Avatar1,
            Avatar2,
            Avatar3,
            Avatar4,
            Avatar1,
            Avatar1,
            Avatar1,
            Avatar1,
          ]}
          image={Nft2}
          currentbid="0.91 ETH"
          download="#"
        />
        <NFT
          name="Mesh Gradients "
          author="By Will Smith"
          bidders={[
            Avatar1,
            Avatar2,
            Avatar3,
            Avatar4,
            Avatar1,
            Avatar1,
            Avatar1,
            Avatar1,
          ]}
          image={NFT}
          currentbid="0.91 ETH"
          download="#"
        />
      </SimpleGrid>

      <Project
        boxShadow={cardShadow}
        mb="20px"
        image={Project1}
        ranking="1"
        link="#"
        title="Technology behind the Blockchain"
      />
      <Project
        boxShadow={cardShadow}
        mb="20px"
        image={Project2}
        ranking="2"
        link="#"
        title="Greatest way to a good Economy"
      />
      <Project
        boxShadow={cardShadow}
        image={Project3}
        ranking="3"
        link="#"
        title="Most essential tips for Burnout"
      />

      <NewWebsite
        render={getWebsites}
        show={isOpen}
        onClose={onClose}
        userId={props.userId}
      />
    </Card>
  );
}
