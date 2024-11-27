CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



create table employes (
    id serial primary key,
    name varchar(255) not null,
    document varchar(255) not null,
    address varchar(255),
    init_date timestamp,
    email varchar(255),
    phone_number varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);

CREATE TRIGGER trigger_update_updated_at_employee BEFORE UPDATE ON "employee" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table employe_status (
    id serial primary key,
    name varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);

CREATE TRIGGER trigger_update_updated_at_employe_status BEFORE UPDATE ON "employe_status" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table actual_employe_status (
    id serial primary key,
    employe_id int not null,
    employe_status_id int not null,
    created_at timestamp not null default now(),
    updated_at timestamp,
    foreign key (id) references employes(id),
    foreign key (id) references employe_status(id)
);

CREATE TRIGGER trigger_update_updated_at_actual_employe_status BEFORE UPDATE ON "actual_employe_status" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();



-- base de datos de muestra
create table user_type (
    id serial primary key,
    name varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);




CREATE TRIGGER trigger_update_updated_at_user_type BEFORE UPDATE ON "user_type" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table "user" (
    id serial primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    user_type_id int not null,
    created_at timestamp not null default now(),
    updated_at timestamp,
    foreign key (user_type_id) references user_type(id)
);


CREATE TRIGGER trigger_update_updated_at_user BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();



create table notification (
    id serial primary key,
    user_id int not null,
    message varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp,
    foreign key (user_id) references "user"(id)
);

CREATE TRIGGER trigger_update_updated_at_notification BEFORE UPDATE ON "notification" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table products (
    id serial primary key,
    name varchar(255) not null,
    price decimal not null,
    descuento decimal not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);

CREATE TRIGGER trigger_update_updated_at_products BEFORE UPDATE ON "products" FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table products_images (
    id serial primary key,
    product_id int not null,
    key_aws varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp,
    foreign key (product_id) references products(id)
);

create trigger trigger_update_updated_at_products_images before update on products_images for each row execute function trigger_set_timestamp();

create table clients (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);

create trigger trigger_update_updated_at_clients before update on clients for each row execute function trigger_set_timestamp();


ALTER TABLE "user" ADD COLUMN token text;

CREATE TABLE chat (
    id serial primary key,
    asesor_id int not null,
    last_message text not null,
    phone_number varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp,
    foreign key (asesor_id) references "user"(id)
);

CREATE TABLE chat_state (
    id serial primary key,
    chat_id int not null,
    state varchar(255) not null,
    created_at timestamp not null default now(),
    deleted_at timestamp,
    updated_at timestamp,
    foreign key (chat_id) references chat(id)
);

create trigger trigger_update_updated_at_chat_state before update on chat_state for each row execute function trigger_set_timestamp();