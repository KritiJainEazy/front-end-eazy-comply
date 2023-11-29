import OperationsIcon from "../../../assets/operationSideBarMenuIcon.png";

export const menuItems = [
  {
    title: "Operations",
    logo: OperationsIcon,
    subMenu: [
      {
        subMenuTitle: "Organization",
        subMenuAction: () => {
          console.log("Organization");
        },
      },
    ],
  },
  {
    title: "Compliance Audits",
    logo: OperationsIcon,
    subMenu: [
      {
        subMenuTitle: "Project",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
      {
        subMenuTitle: "Audit",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
      {
        subMenuTitle: "CAP",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
    ],
  },
  {
    title: "Configurations ",
    logo: OperationsIcon,
    subMenu: [
      {
        subMenuTitle: "Template",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
      {
        subMenuTitle: "Industry",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
      {
        subMenuTitle: "Section",
        subMenuAction: () => {
          console.log("heyyya");
        },
      },
    ],
  },
];
