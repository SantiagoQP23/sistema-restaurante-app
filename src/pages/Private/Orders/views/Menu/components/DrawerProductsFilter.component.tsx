import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Drawer,
  Box,
  useTheme,
  Stack,
  Typography,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
  Radio,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, setActiveCategory } from "../../../../../../redux";
import { ICategory } from "../../../../../../models";

export const DrawerProductsFilter = NiceModal.create(() => {
  const drawer = useModal();

  const theme = useTheme();

  const { sections, activeCategory } = useSelector(selectMenu);
  const dispatch = useDispatch();

  const closeDrawer = () => {
    drawer.hide();
  };

  const sectionsWithCategories = sections.filter(
    (section) => section.categories.length > 0
  );

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
    closeDrawer();
  };

  return (
    <Drawer
      anchor="right"
      open={drawer.visible}
      onClose={closeDrawer}
      sx={{
        width: "auto",
        zIndex: 10000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 1,
          [theme.breakpoints.down("sm")]: { width: "80vw" },
          [theme.breakpoints.up("sm")]: { width: 300, flexShrink: 0 },
        }}
      >
        <Stack direction="column" spacing={2} width="100%">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Filtros</Typography>

            <IconButton onClick={closeDrawer}>
              <CloseOutlined />
            </IconButton>
          </Box>

          <Divider />

          <Stack direction="column" spacing={2} width="100%">
            {sectionsWithCategories.map((section) => (
              <Box key={section.id}>
                <Typography variant="h5">{section.name}</Typography>
                <FormGroup>
                  {section.categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={<Radio />}
                      label={category.name}
                      checked={activeCategory?.id === category.id}
                      onChange={() => changeCategory(category)}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
});
