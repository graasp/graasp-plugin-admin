# Graasp-plugin-admin
## Important: Current code is not tested and could contain potential bugs.
This repository is for backend of Graasp Admin.

## Related Tables (db-schema.sql)
- role (id, name): Store role information
- member_role (id, member_id, role_id): Store relationship between roles and members. A member could have multiple roles

## Endpoints
- /member-role/current: Get all memberRoles of current user

## Other exported functions
- isAdmin: Check whether current user has admin role.