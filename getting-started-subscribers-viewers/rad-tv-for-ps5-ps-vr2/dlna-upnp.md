# DLNA/UPnP

{% hint style="info" %}
Plex was used while implementing and Jellyfin was used as an additional test point. These should be the most reliable media servers and have sufficient documentation on how to connect with Rad TV for PS5 / PS VR2.
{% endhint %}

## DLNA vs. UPnP

What is the difference between DLNA (Digital Living Network Alliance) and UPnP (Universal Plug and Play)? Well not much. Think of DLNA as a car and UPnP is the engine of said car. DLNA uses and extends the functionality of UPnP.

Because they are so tightly coupled together it is common to see people interchange the terms DLNA and UPnP. So if you see options for DLNA or UPnP they are both related with connecting to a local media server and you are in the right place.

## Network Security

DLNA/UPnP has some security vulnerabilities that are worth noting.

If you host a media server with DLNA/UPnP enabled anyone on your home network will be able to view and stream your content. If you have a shared network with other homes or simply do not want people in your home to view and stream your content this can be remedied. To fix this you'll be using the media server's IP address whitelist feature, unfortunately, it is quite technical to do this. You would need to set a static IP address on your PS5 as it changes over time, or if you do not want to bother with this then you need to find the dynamic IP address. Then you would need to figure out how to whitelist just your IP address. We will leave you with some tips to achieve this below.

UPnP needs to be disabled on your router. This is the default setting but if it has been enabled it should be disabled. This seems counterintuitive but this setting exposes DLNA/UPnP servers and devices with the entire Internet. So anybody in the world could access all your media servers or other servers and devices. More details about this below.

### Setting a Static IP Address for your PS5

This can be done on your router or on the device itself. We **absolutely do not recommend doing this on the device**. In the situation where your router gives your chosen IP address to another device instead of your PS5, your PS5 once turned on would suddenly have no Internet access. Setting a static IP address for your PS5 on your router makes this situation impossible.

Usually setting up a static IP requires the MAC address of the network adapter used. If your PS5 is using a wired Ethernet connection then go to Settings > Network > Connection Status > View Connection Status > MAC address (LAN cable). If your PS5 is using wireless Wi-Fi connection go to Settings > Network > Connection Status > View Connection Status > MAC address (Wi-Fi).

There are many brands of routers and each may have slight differences but you should be able to find a guide online. When looking for a guide, search using the router brand you have plus the term "address reservation". Usually it's under DHCP settings. If you cannot find a guide or if you are using a rented router from your ISP you can always contact your ISP for help setting this up.

#### Guides for Common Router Brands on Address Reservation

* [TP-Link](https://community.tp-link.com/en/home/stories/detail/1240)
* [NETGEAR](https://kb.netgear.com/25722/How-do-I-reserve-an-IP-address-on-my-NETGEAR-router)
* [Asus](https://www.asus.com/support/faq/1000906/)
* [Linksys](https://support.linksys.com/kb/article/867-en/)

Once a static IP is set, **restart your router and PS5**. You can double check to see if it worked by going on your PS5 to Settings > Network > Connection Status > View Connection Status > IPv4 address. If that address is not the static address something is wrong.

### Getting the Dynamic IP Address of your PS5

Go to Settings > Network > Connection Status > View Connection Status then your dynamic IP address is listed under "IPv4 address".

### Disabling UPnP on your Router

Most routers have UPnP setting and its **disabled by default but it's worth double checking if you know someone has or could have changed any of the router settings**. This needs to be disabled as it is a major network security vulnerability. This setting exposes your DLNA/UPnP devices and server to the entire Internet. You only want to expose your media server to your home network not the entire Internet. Disabling UPnP on your router will not affect access within your home network.

{% hint style="warning" %}
It is worth noting that some multiplayer game servers and other services require this to work. Generally it is not used anymore but older games and services that use UPnP will no longer work.
{% endhint %}

To disable you simply need to find the UPnP section on your router's web GUI and disable the option. When looking for a guide, search using the router brand you have plus one of the following terms "disable UPnP", "enable UPnP", "disable NAT-PMP", or "enable NAT-PMP".

#### Guides for Common Router Brand on Finding UPnP Settings

{% hint style="warning" %}
Some guides below **for enabling UPnP**. **Do not follow the guide completely if that is the case**. Only use it to find the UPnP option on your router, then verify the option is disable/off.
{% endhint %}

* [TP-Link](https://community.tp-link.com/us/home/kb/detail/348)
* [NETGEAR](https://kb.netgear.com/24306/How-do-I-enable-or-disable-Universal-Plug-and-Play-on-my-NETGEAR-router)
* [Asus](https://www.asus.com/support/faq/1045028/)

### Whitelisting an IP Address on a Media Server

Usually this setting can be found under one of these places: DLNA/UPnP settings, Network settings, or User/Account-Specific settings. You'll have to search online how to do it with your specific media server application. Then finally using static or dynamic IP address gotten from the previous steps, add your PS5's IP address to the whitelist.

## [Plex](https://www.plex.tv/personal-media-server/)

{% hint style="warning" %}
We have noticed that Plex misidentifies WEBM videos as MKV. We do not support MKV videos at the moment, so the app erroneously flags WEBM videos as not being supported. We are looking at options to amend this. If you have WEBM videos re-encode them as MP4 videos for now.
{% endhint %}

**"Paradise is a** [**Plex Media Server**](https://www.plex.tv/personal-media-server/)**.**\
Don’t just store your movies and music—experience it like never before. Plex personal media server magically scans and organizes your files, sorting your media intuitively and beautifully."

Plex Media Server can be downloaded and installed from [here](https://www.plex.tv/media-server-downloads/?cat=computer\&plat=windows#plex-media-server).

### Enabling DLNA

Go to Account Settings > {Server Name} > DLNA then check the "Enable the DLNA server" option and configure any additional settings then click the "Save" button at the bottom of the page. You're all done!

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-20 124616.png" alt="" width="375"><figcaption><p>Plex DLNA Settings</p></figcaption></figure>

### Tips

* Plex was what was used for implementation and the majority of testing and for that reason should be the most reliable media server.

## [Jellyfin](https://jellyfin.org/)

{% hint style="warning" %}
We have noticed that Jellyfin misreports MP4 videos as MOV when using DLNA. We do not support MOV videos at the moment, so the app erroneously flags these mislabeled MP4 videos as not being supported. The current solution is using the custom DLNA profile below.
{% endhint %}

{% hint style="warning" %}
When Jellyfin's DLNA plugin is updated to a new major version (e.g., 5.x.x.x → 6.x.x.x), it unfortunately does **not** copy or reuse the previous version's `profile` folder. As a result, you will need to redo step 3 and onward.
{% endhint %}

"[Jellyfin ](https://jellyfin.org/)is the volunteer-built media solution that puts _you_ in control of your media. Stream to any device from your own server, with no strings attached. Your media, your server, your way."

Jellyfin can be download for install [here](https://jellyfin.org/downloads).

### Installing & Configuring DLNA Plugin

1. Go to Dashboard > Plugins > Catalog and install the official DLNA plugin

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-20 125440.png" alt="" width="375"><figcaption><p>Jellyfin DLNA Plugin Install</p></figcaption></figure>

2. Go to the Dashboard and click the Restart button to restart the server for the DLNA plugin to install
3. Download this DLNA profile

{% file src="../../.gitbook/assets/Rad TV for PS VR2.xml" %}
Jellyfin DLNA Profile for Rad TV for PS VR2
{% endfile %}

4. Find your Jellyfin DLNA profiles folder. This should be in the same root folder as your cache, logs, and metadata folders. This path can be found on the Admin Dashboard as well at the bottom where it says Paths. For Windows this usually should be found at `C:\Users\{USER}\AppData\Local\jellyfin\plugins\DLNA_{X.Y.Z.W}\profiles`. Where `{USER}` is replaced with your Windows username and the `{X.Y.Z.W}` is replaced with the current DLNA plugin version.

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-20 101459.png" alt="" width="375"><figcaption><p>Jellyfin Paths</p></figcaption></figure>

5. Put the DLNA profile you downloaded earlier into the DLNA profiles folder.

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-20 101125.png" alt="" width="375"><figcaption><p>Jellyfin DLNA Profiles Folder</p></figcaption></figure>

6. Finally go back to the Dashboard and click the Restart button to restart the server for it to load the new DLNA profile. This step may be redundant but it does not hurt to restart the server one last time. Then adjust the DLNA settings as needed.

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-20 125140.png" alt="" width="375"><figcaption><p>Jellyfin DLNA Plugin Settings</p></figcaption></figure>

### Tips

* Jellyfin has some really good logging for debugging problems with DLNA. If you are having problems double check the logs to see if something is blocking the DLNA port and/or enable DLNA Debug logging for more information as shown on the [Jellyfin DLNA docs](https://jellyfin.org/docs/general/networking/dlna/).

## Other Media Server Applications

We are trying to support all major server applications, but there are quite a few. All media server applications are going to have a different way to enable DLNA/UPnP but generally you navigate to an admin webpage and find the DLNA/UPnP section to enable DLNA/UPnP. If there is no DLNA/UPnP section the next best place to check is the Networking section. If you are uncomfortable poking around by yourself in the settings look up a guide for your particular media server application. Then you're all set! Sit back and watch your videos on Rad TV.

## General Tips

* There is usually an option to decrease the interval at which the media server broadcasts it's presence to clients such as our application. This setting is not always named the same unfortunately, but for Plex it's called "DLNA server announcement lease time" and on Jellyfin it's called "Client Discovery Interval". If you are having issues connecting it never hurts to decrease this value. The value we use for testing is 30 seconds and that worked great and made the discovery rather quick.
* DLNA/UPnP can be very unreliable. When running the app in the Unity Editor on Windows, restarting was required quite often because other applications were blocking ports to discover the media servers. There is no easy way to tell why you're unable to find a media server, although [Wireshark](https://www.wireshark.org/) is most likely the best tool for this it requires a high level of networking knowledge to use and understand. This is much less of a problem on PS5 where there are less applications running but an important note to make nonetheless.&#x20;

## Streaming from your Media Server

Now that you have your media server setup, all you need to do is open Rad TV for PS5 / PS VR2 and sign in with an account that has a Rad Premium subscription. Navigate to the Library menu using the sidebar. Then open the DLNA/UPnP Library Menu.

<figure><img src="../../.gitbook/assets/Image Sequence_026_0000.jpg" alt="" width="375"><figcaption><p>DLNA/UPnP Library Menu Button</p></figcaption></figure>
