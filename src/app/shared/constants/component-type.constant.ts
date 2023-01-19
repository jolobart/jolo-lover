import { TransactionFormComponent } from "src/app/transaction/transaction-form/transaction-form.component";
import { ComponentType } from "../enums/component-type.enum";

export const COMPONENT_TYPES: Record<ComponentType, any> = {
    [ComponentType.TransactionForm]: TransactionFormComponent
};

















// this.COMPONENT_TYPES[ComponentType.TransactionForm]