import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavDataItem {
  label: string;
  href: string;
  className: string;
  icon?: IconDefinition;
}
