Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = appDir
bunPath = WshShell.ExpandEnvironmentStrings("%USERPROFILE%\.bun\bin\bun.exe")
cmd = "cmd /c set NODE_ENV=production && """ & bunPath & """ run src/server/index.ts >> data\server.log 2>&1"
WshShell.Run cmd, 0, False
