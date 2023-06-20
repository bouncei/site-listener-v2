// Chakra imports
import { Box, Grid } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "img/auth/banner.png";
import avatar from "img/avatars/avatar4.png";
import { useAuth } from "hooks";

export default function ProfileOverview() {
  const { user } = useAuth();
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "2fr 1fr",
          }}
          templateRows={{
            base: "1fr",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          <Banner
            gridArea="1 / 1 / 2 / 2"
            banner={banner}
            avatar={avatar}
            name={user?.username}
            job={user?.isAdmin ? "Admin" : "Product Designer"}
            websites="17"
            inactive="9.7k"
            active="274"
          />

          <Upload gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }} />
        </Grid>
        <Grid
          mb="20px"
          templateColumns={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
            "2xl": "2.34fr  1fr",
          }}
          templateRows={{
            base: "1fr",

            "2xl": "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          <Projects
            banner={banner}
            avatar={avatar}
            userId={user?._id}
            name="Adela Parkson"
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          />
          <General
            gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
            minH="365px"
            pe="20px"
          />
          {/* <Notifications
            used={25.6}
            total={50}
            gridArea={{
              base: "3 / 1 / 4 / 2",
              lg: "2 / 1 / 3 / 3",
              "2xl": "1 / 3 / 2 / 4",
            }}
          /> */}
        </Grid>
      </Box>
    </AdminLayout>
  );
}
