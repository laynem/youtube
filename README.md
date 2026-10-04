"# youtube" 
"# youtube" 

## Realtime Database security rules

`database.rules.json` only allows signed-in users whose UID is set to `true` under `/admins` to read or write the database.

1. Firebase console → Authentication → Users: copy your **User UID**.
2. Realtime Database → Data: add the child `admins` → `<your UID>` with value `true`.
3. Publish the rules: paste `database.rules.json` into Realtime Database → Rules, or run `firebase deploy --only database`.
