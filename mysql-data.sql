INSERT INTO admin.permissions
(name)
VALUES('view_users');

INSERT INTO admin.permissions
(name)
VALUES('edit_users');


INSERT INTO admin.roles
(name)
VALUES('Admin');

INSERT INTO admin.roles
(name)
VALUES('Editor');

INSERT INTO admin.roles
(name)
VALUES('Viewer');

-- 

INSERT INTO admin.permissions
(name)
VALUES('view_roles');


INSERT INTO admin.permissions
(name)
VALUES('edit_roles');


INSERT INTO admin.permissions
(name)
VALUES('view_products');


INSERT INTO admin.permissions
(name)
VALUES('edit_products');


INSERT INTO admin.permissions
(name)
VALUES('view_orders');


INSERT INTO admin.permissions
(name)
VALUES('edit_orders');


INSERT INTO admin.orders
(first_name, last_name, email, created_at)
VALUES('a', 'a', 'a@a.com', CURRENT_TIMESTAMP(6));

INSERT INTO admin.orders
(first_name, last_name, email, created_at)
VALUES('b', 'b', 'b@b.com', CURRENT_TIMESTAMP(6));

INSERT INTO admin.order_items
(product_title, price, quantity, order_id)
VALUES('a', 10, 1, 1);

INSERT INTO admin.order_items
(product_title, price, quantity, order_id)
VALUES('b', 20, 2, 1);

INSERT INTO admin.order_items
(product_title, price, quantity, order_id)
VALUES('c', 30, 3, 2);

INSERT INTO admin.order_items
(product_title, price, quantity, order_id)
VALUES('d', 40, 4, 2);

