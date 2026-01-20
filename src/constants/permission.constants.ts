import { Categories_permissions } from "src/modules/categories/categories.permissions";
import { CONTACT_PERMISSIONS } from "src/modules/contact/contact.permissions";
import { Currencies_permissions } from "src/modules/currencies/currencies.permissions";
import { Customers_permissions } from "src/modules/customers/customers.permissions";
import { Discount_permissions } from "src/modules/discount/discount.permissions";
import { Faq_permissions } from "src/modules/faqs/faq.permissions";
import { Faq_cate_permissions } from "src/modules/faq-cate/faq-cate.permission";
import { orders_permissions } from "src/modules/orders/orders.permissions";
import { posts_permissions } from "src/modules/posts/posts.permissions";
import { attributes_permissions } from "src/modules/product-attributes/product-attributes.permissions";
import { product_cate_permissions } from "src/modules/product-categories/product-categories.permissions";
import { product_collections_permissions } from "src/modules/product-collections/product-collections.permissions";
import { product_labels_permissions } from "src/modules/product-labels/product-labels.permissions";
import { product_tags_permissions } from "src/modules/product-tags/product-tags.permissions";
import { products_permissions } from "src/modules/products/products.permissions";
import { roles_permissions } from "src/modules/roles/roles.permissions";
import { tags_permissions } from "src/modules/tags/tags.permissions";
import { tax_permissions } from "src/modules/tax/tax.permissions";

export const ALL_PERMISSIONS = [
    ...Categories_permissions,
    ...CONTACT_PERMISSIONS,
    ...Currencies_permissions,
    ...Customers_permissions,
    ...Discount_permissions,
    ...Faq_cate_permissions,
    ...Faq_permissions,
    ...orders_permissions,
    ...posts_permissions,
    ...attributes_permissions,
    ...product_cate_permissions,
    ...product_collections_permissions,
    ...product_labels_permissions,
    ...product_tags_permissions,
    ...products_permissions,
    ...roles_permissions,
    ...tags_permissions,
    ...tax_permissions,
] as const;