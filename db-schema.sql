CREATE TABLE role (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO role (name)
VALUES ('admin');


CREATE TABLE member_role (
  id uuid DEFAULT uuid_generate_v4(),
  member_id uuid NOT NULL REFERENCES member("id") ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES role("id") ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
  PRIMARY KEY (role_id, member_id)
);