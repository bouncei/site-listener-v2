// Chakra imports
import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      <Image
        src="/img/icon/site-logo.png"
        alt="Custom Icon"
        // boxSize="1em" // Set the desired size of your icon
        h="30px"
        w="175px"
        my="28px"
        color={logoColor}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
