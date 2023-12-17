import { FC, useState, KeyboardEvent } from "react";
import { ProductionArea } from "../../Common/models/production-area.model";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  TextField,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import { DonutSmall, Edit, Save } from "@mui/icons-material";
import { useUpdateProductionArea } from "../hooks/useProductionArea";
import { UpdateProductionAreaDto } from "../dto/update-production-area.dto";

interface Props {
  area: ProductionArea;
}

export const ProductionAreaItem: FC<Props> = ({ area }) => {
  const [name, setName] = useState(area.name);
  const [isActive, setIsActive] = useState(area.isActive);

  const { isLoading, mutateAsync } = useUpdateProductionArea();

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChangeStatus = () => {
    setIsActive(!isActive);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateArea = async () => {
    const productionArea: UpdateProductionAreaDto = {
      name,
      isActive,
    };

    await mutateAsync({ id: area.id, productionArea });
    toggleEdit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Enter key is pressed, execute your update logic
      updateArea();
    }
  };

  const disableSave = area.name === name && isActive === area.isActive;

  return (
    <ListItem>
      <ListItemIcon>
        <DonutSmall />
      </ListItemIcon>

      {isEditing ? (
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          onKeyDown={handleKeyDown}
        />
      ) : (
        <ListItemText
          primary={name}
          secondary={area.description}
          primaryTypographyProps={{
            variant: "h5",
            color: area.isActive ? "text.primary" : "text.disabled",
          }}
        />
      )}
      <ListItemSecondaryAction>
        {isEditing && (
          <Switch checked={isActive} onChange={handleChangeStatus} />
        )}

        {isEditing ? (
          <IconButton onClick={updateArea} disabled={disableSave}>
            {isLoading ? <CircularProgress sx={{ fontSize: 14 }} /> : <Save />}
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
