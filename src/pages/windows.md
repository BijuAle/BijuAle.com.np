---
title: Windows Automations
tags: ['Computing']
---

# Unofficial activiations

```
Run in elevated Powershell:
irm https://massgrave.dev/get | iex
```

# cmd Context Menu

```
1. Run 'regedit'.
2. Browse HKEY_CLASSES_ROOT\Directory\Background\shell\cmd
3. Right click 'cmd' > 'Permissions' > 'Advanced' > 'Change'
4. Add owner/user name
5. Tick 'Replace owner...'
6. OK
7. Permissions for cmd > Administrators > Allow full control
8. OK
9. Rename 'HideBasedOnVelocityId' to 'ShowBasedOnVelocityId'
```

# Debloater

```
@echo off
powershell -Command "iwr -useb https://christitus.com/win | iex"
```

# Killing USB Trojan

```
Steps to remove shortcut virus:

1. Open the command prompt.
2. Assuming that your target drive letter is L, type the following
	C:\> cd /d L:
	L:\> attrib -s -h -a -r /s /d *.*
3. You should now see all the invisible files along with the shortcut. Delete them except the autorun.inf file.
4. Download Process Explorer by Sysinternals and Unlocker 1.9 by Collomb.
5. Use the Unlocker and determine the process that is using the autorun.inf sorry for the image, imgur.com kills the quality. In the image, wuauclt.exe is using the autorun.inf
6. Open the Process Explorer and look for the process. Press CTRL+L and sort the �type� column. Scrolldown to the �file� type.
7. You should see the autorun.inf being used by the process. If you don�t see it, you are looking at thewrong process. Right click the row and select Close handle.
8. The autorun.inf should be removable already. Next we need to see if there is already a backdoor in ourcomputer. Look again at the �files� being used by the process and search something suspicious. Typicallyfound in your C:\users\your-username-here. Look for something like this. AppData\Local\Temp\mstuaespm.pif
9. Close the handle, just like what you did in autorun.inf then remove the file inside your drive.
```

# Move dir/subdirs to PWD

```
for /r %i in (*) do move "%i" .
```

# Print system specs

```
msinfo32 /report .\sys.txt
```

# Remove all FLACs

```
for /R %f in (*.flac) do echo del "%f" | cmd
```

# Windows to Samba

```
yay -S samba

sudo nano /etc/samba/credentials
username=your_username
password=your_password

sudo chmod 600 /etc/samba/credentials

For each mountpoint:
//server/share   /mnt/windows_share   cifs   credentials=/etc/samba/credentials   0   0

sudo mount -a
```

# Run commands

| Function Command                                                                  |
| --------------------------------------------------------------------------------- |
| Open Documents Folder documents                                                   |
| Open Videos folder videos                                                         |
| Open Downloads Folder downloads                                                   |
| Open Favorites Folder favorites                                                   |
| Open Recent Folder recent                                                         |
| Open Pictures Folder pictures                                                     |
| Windows Sideshow control.exe /name Microsoft.WindowsSideshow                      |
| Windows CardSpace control.exe /name Microsoft.cardspace                           |
| Windows Anytime Upgrade WindowsAnytimeUpgradeui                                   |
| Taskbar and Start Menu control.exe /name Microsoft.TaskbarandStartMenu            |
| Troubleshooting control.exe /name Microsoft.Troubleshooting                       |
| User Accounts control.exe /name Microsoft.UserAccounts                            |
| Adding a new Device devicepairingwizard                                           |
| Add Hardware Wizard hdwwiz                                                        |
| Advanced User Accounts netplwiz                                                   |
| Advanced User Accounts azman.msc                                                  |
| Backup and Restore sdclt                                                          |
| Bluetooth File Transfer fsquirt                                                   |
| Calculator calc                                                                   |
| Certificates certmgr.msc                                                          |
| Change Computer Performance Settings systempropertiesperformance                  |
| Change Data Execution Prevention Settings systempropertiesdataexecutionprevention |
| Change Data Execution Prevention Settings printui                                 |
| Character Map charmap                                                             |
| ClearType Tuner cttune                                                            |
| Color Management colorcpl                                                         |
| Command Prompt cmd                                                                |
| Component Services comexp.msc                                                     |
| Component Services dcomcnfg                                                       |
| Computer Management compmgmt.msc                                                  |
| Computer Management compmgmtlauncher                                              |
| Connessione proiettore di rete netproj                                            |
| Connect to a Projector displayswitch                                              |
| Control Panel control                                                             |
| Create A Shared Folder Wizard shrpubw                                             |
| Create a System Repair Disc recdisc                                               |
| Credential Backup and Restore Wizard credwiz                                      |
| Data Execution Prevention systempropertiesdataexecutionprevention                 |
| Date and Time timedate.cpl                                                        |
| Default Location locationnotifications                                            |
| Device Manager devmgmt.msc                                                        |
| Device Manager hdwwiz.cpl                                                         |
| Device Pairing Wizard devicepairingwizard                                         |
| Diagnostics Troubleshooting Wizard msdt                                           |
| Digitizer Calibration Tool tabcal                                                 |
| DirectX Diagnostic Tool dxdiag                                                    |
| Disk Cleanup cleanmgr                                                             |
| Disk Defragmenter dfrgui                                                          |
| Disk Management diskmgmt.msc                                                      |
| Display dpiscaling                                                                |
| Display Color Calibration dccw                                                    |
| Display Switch displayswitch                                                      |
| DPAPI Key Migration Wizard dpapimig                                               |
| Driver Verifier Manager verifier                                                  |
| Ease of Access Center utilman                                                     |
| EFS Wizard rekeywiz                                                               |
| Event Viewer eventvwr.msc                                                         |
| Fax Cover Page Editor fxscover                                                    |
| File Signature Verification sigverif                                              |
| Font Viewer fontview                                                              |
| Game Controllers joy.cpl                                                          |
| Getting Started gettingstarted                                                    |
| IExpress Wizard iexpress                                                          |
| Getting Started irprops.cpl                                                       |
| Install or Uninstall Display Languages lusrmgr                                    |
| Internet Explorer iexplore                                                        |
| Internet Options inetcpl.cpl                                                      |
| iSCSI Initiator Configuration Tool iscsicpl                                       |
| Language Pack Installer lpksetup                                                  |
| Local Group Policy Editor gpedit.msc                                              |
| Local Security Policy secpol.msc                                                  |
| Local Users and Groups lusrmgr.msc                                                |
| Location Activity locationnotifications                                           |
| Magnifier magnify                                                                 |
| Malicious Software Removal Tool mrt                                               |
| Manage Your File Encryption Certificates rekeywiz                                 |
| Math Input Panel mip                                                              |
| Microsoft Management Console mmc                                                  |
| Microsoft Support Diagnostic Tool msdt                                            |
| Mouse main.cpl                                                                    |
| NAP Client Configuration napclcfg.msc                                             |
| Narrator narrator                                                                 |
| Network Connections ncpa.cpl                                                      |
| New Scan Wizard wiaacmgr                                                          |
| Notepad notepad                                                                   |
| ODBC Data Source Administrator odbcad32                                           |
| ODBC Driver Configuration odbcconf                                                |
| On-Screen Keyboard osk                                                            |
| Paint mspaint                                                                     |
| Pen and Touch tabletpc.cpl                                                        |
| People Near Me collab.cpl                                                         |
| Performance Monitor perfmon.msc                                                   |
| Performance Options systempropertiesperformance                                   |
| Phone and Modem telephon.cpl                                                      |
| Phone Dialer dialer                                                               |
| Power Options powercfg.cpl                                                        |
| Presentation Settings presentationsettings                                        |
| Print Management printmanagement.msc                                              |
| Printer Migration printbrmui                                                      |
| Printer User Interface printui                                                    |
| Private Character Editor eudcedit                                                 |
| Problem Steps Recorder psr                                                        |
| Programs and Features appwiz.cpl                                                  |
| Protected Content Migration dpapimig                                              |
| Region and Language intl.cpl                                                      |
| Registry Editor regedit                                                           |
| Registry Editor 32 regedt32                                                       |
| Remote Access Phonebook rasphone                                                  |
| Remote Desktop Connection mstsc                                                   |
| Resource Monitor resmon                                                           |
| Resultant Set of Policy rsop.msc                                                  |
| SAM Lock Tool syskey                                                              |
| Screen Resolution desk.cpl                                                        |
| Securing the Windows Account Database syskey                                      |
| Services services.msc                                                             |
| Set Program Access and Computer Defaults computerdefaults                         |
| Share Creation Wizard shrpubw                                                     |
| Shared Folders fsmgmt.msc                                                         |
| Snipping Tool snippingtool                                                        |
| Sound mmsys.cpl                                                                   |
| Sound recorder soundrecorder                                                      |
| SQL Server Client Network Utility cliconfg                                        |
| Sticky Notes stikynot                                                             |
| Stored User Names and Passwords credwiz                                           |
| Sync Center mobsync                                                               |
| System Configuration msconfig                                                     |
| System Configuration Editor sysedit                                               |
| System Information msinfo32                                                       |
| System Properties sysdm.cpl                                                       |
| System Properties (Advanced Tab) systempropertiesadvanced                         |
| System Properties (Computer Name Tab) systempropertiescomputername                |
| System Properties (Hardware Tab) systempropertieshardware                         |
| System Properties (Remote Tab) systempropertiesremote                             |
| System Properties (System Protection Tab) systempropertiesprotection              |
| System Restore rstrui                                                             |
| Task Manager taskmgr                                                              |
| Task Scheduler taskschd.msc                                                       |
| Trusted Platform Module (TPM) Management tpm.msc                                  |
| User Account Control Settings useraccountcontrolsettings                          |
| Utility Manager utilman                                                           |
| Version Reporter Applet winver                                                    |
| Volume Mixer sndvol                                                               |
| Windows Action Center wscui.cpl                                                   |
| Windows Activation Client slui                                                    |
| Windows Anytime Upgrade Results windowsanytimeupgraderesults                      |
| Windows CardSpace infocardcpl.cpl                                                 |
| Windows Disc Image Burning Tool isoburn                                           |
| Windows DVD Maker dvdmaker                                                        |
| Windows Easy Transfer migwiz                                                      |
| Windows Explorer explorer                                                         |
| Windows Fax and Scan wfs                                                          |
| Windows Features optionalfeatures                                                 |
| Windows Firewall firewall.cpl                                                     |
| Windows Firewall with Advanced Security wf.msc                                    |
| Windows Journal journal                                                           |
| Windows Media Player wmplayer                                                     |
| Windows Memory Diagnostic Scheduler mdsched                                       |
| Windows Mobility Center mblctr                                                    |
| Windows Picture Acquisition Wizard wiaacmgr                                       |
| Windows PowerShell powershell                                                     |
| Windows PowerShell ISE powershell_ise                                             |
| Windows Remote Assistance msra                                                    |
| Windows Repair Disc recdisc                                                       |
| Windows Script Host wscript                                                       |
| Windows Update wuapp                                                              |
| Windows Update Standalone Installer wusa                                          |
| Versione Windows winver                                                           |
| WMI Management wmimgmt.msc                                                        |
| WordPad write                                                                     |
| XPS Viewer xpsrchvw                                                               |
