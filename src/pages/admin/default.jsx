/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { isWindowAvailable } from "utils/navigation";
import AdminLayout from "layouts/admin";
import { Image } from "components/image/Image";
import { BsShieldLockFill, BsGlobe2 } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

import Usa from "img/dashboards/usa.png";

export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
            gap="20px"
            mb="20px"
          >
            {/* <MiniStatistics
              endContent={
                <Flex me="-16px" mt="10px">
                  <FormLabel htmlFor="balance">
                    <Box boxSize={"12"}>
                      <Image src={Usa} alt="" w={"100%"} h={"100%"} />
                    </Box>
                  </FormLabel>
                  <Select
                    id="balance"
                    variant="mini"
                    mt="5px"
                    me="0px"
                    defaultValue="usd"
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gba">GBA</option>
                  </Select>
                </Flex>
              }
              name="Your balance"
              value="$1,000"
            /> */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={BsShieldLockFill}
                      color={"#EE5D50"}
                    />
                  }
                />
              }
              name="No SSL"
              value="2935"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={BsShieldLockFill}
                      color={"green"}
                    />
                  }
                />
              }
              name="Active SSL"
              value="2935"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={BsGlobe2} color={"#EE5D50"} />
                  }
                />
              }
              name="Not Active "
              value="2935"
            />{" "}
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={<Icon w="28px" h="28px" as={BsGlobe2} color="green" />}
                />
              }
              name="Active "
              value="2935"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={BsGlobe2} color={brandColor} />
                  }
                />
              }
              name="Total Websites"
              value="2935"
            />
          </SimpleGrid>

          <Flex
            direction={{ base: "column", md: "row", xl: "row" }}
            gap="20px"
            mb="20px"
          >
            <Box flex={8}>
              <ComplexTable
                columnsData={columnsDataComplex}
                tableData={tableDataComplex}
              />
            </Box>
            <Box flex={4}>
              <PieCard />
            </Box>
          </Flex>
          {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid> */}
        </>
      </Box>
    </AdminLayout>
  );
}
