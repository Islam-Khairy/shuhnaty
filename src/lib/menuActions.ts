import editShipmentIcon from '/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '/images/delete-shipment-icon.svg';

export interface MenuActionConfig {
  editLabel: string;
  editPath: string;
  deleteLabel: string;
  deletePath: string;
}

export interface MenuAction {
  label: string;
  icon: string;
  path: string;
}

export function buildMenuActions(config: MenuActionConfig): MenuAction[] {
  return [
    { label: config.editLabel, icon: editShipmentIcon, path: config.editPath },
    { label: config.deleteLabel, icon: deleteShipmentIcon, path: config.deletePath },
  ];
}
