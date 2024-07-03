# Project Execution

There were two ways to run the project. The first method requires installing and configuring a server on your machine. The steps to configure Apache are described below. The project was also available on a virtual machine, but it is no longer available. For reference, the steps to access the files within the virtual machine were described [at the end of this document.](https://github.com/EMAp-EDA-2021/final-project-grupo-2/blob/main/auxiliares/servidor.md#máquina-virtual).



# Instalação do servidor local 

To run the project correctly, it is necessary to install and configure a server that supports script execution. This brief tutorial explains how to install and configure Apache to execute CGI scripts on Linux.

> Note: These steps were tested on Ubuntu 20.04

## Apache

```s
sudo apt update

sudo apt install apache2
```

## Adjusting the Firewall 

```s
sudo ufw allow 'Apache'
```

After this step you can check the executed versions:

```s
sudo ufw status
```

The expected output should be:

```s
To                         Action      From
--                         ------      ----
Apache                     ALLOW       Anywhere   
Apache (v6)                ALLOW       Anywhere (v6)   
```

## Check installation

Run:

```s
sudo systemctl status apache2
```

The expected output should be:
```s
● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2020-04-23 22:36:30 UTC; 20h ago
       Docs: https://httpd.apache.org/docs/2.4/
   Main PID: 29435 (apache2)
      Tasks: 55 (limit: 1137)
     Memory: 8.0M
     CGroup: /system.slice/apache2.service
             ├─29435 /usr/sbin/apache2 -k start
             ├─29437 /usr/sbin/apache2 -k start
             └─29438 /usr/sbin/apache2 -k start 
```

Finally, check that Apache is working by accessing http://your_server_ip in the browser.
If you don't know your IP, just run:

```s
hostname -I
```

You should see the default Apache index page. 

## Configuring Virtual Host

Go to your Apache files directory and clone the project:

```s
cd /var/www/

git clone https://github.com/EMAp-EDA-2021/final-project-grupo-2.git
```

To edit cloned project files, you must give your user permissions:

> Replace *user* with your username

```s
sudo chown -R user final-project-grupo-2 
```

## Configure the project

Create and access the project configuration file:

```s
sudo nano /etc/apache2/sites-available/final-project-grupo-2.conf
```

Paste the settings:

```s
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName final-project-grupo-2
    ServerAlias www.final-project-grupo-2
    DocumentRoot /var/www/final-project-grupo-2
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Enable the created file and disable the default Apache file:

```s
sudo a2ensite final-project-grupo-2.conf

sudo a2dissite 000-default.conf
```

Check:

```s
sudo apache2ctl configtest
```
The desired output:

```s
Output
Syntax OK
```

Finally, restart Apache:


```s
sudo systemctl restart apache2
```

## CGI Configuration

This is the last and most important server configuration step. 
First, enable the module for cgi and restart Apache:

```s
sudo a2enmod cgid

systemctl restart apache2
```

Now enable script execution in the project directory. 
Open the Apache settings file:

```s
sudo nano /etc/apache2/conf-available/cgi-enabled.conf
```

Paste the settings:


```s
<Directory "/var/www/final-project-grupo-2/back_organizado">
    Options +ExecCGI
    AddHandler cgi-script .cgi .pl .py .rb
</Directory>

<Directory "/var/www/final-project-grupo-2/front">
    Options +ExecCGI
    AddHandler cgi-script .cgi .pl .py .rb
</Directory>
```

Activate the configuration and restart the server:

```s
sudo a2enconf cgi-enabled

systemctl restart apache2
```

Finally, enable the program:

```s
sudo chmod 755 /var/www/final-project-grupo-2/back_organizado/main.cgi
```

## Observation
If changes are made to backend files, it will be necessary to rebuild the program using the command:

```s
g++ -O main.cpp -o main.cgi
```

With this setup, the application should work normally. If any issues arise, a virtual machine has been created where the program runs correctly.

# Virtual Machine

Accessing the virtual machine is very simple from both Linux and Windows. For both systems, you will need to install a program called Putty. Here are the steps to follow on Linux:

## Installing Putty

Install the program:

```s
sudo apt-get update

sudo apt-get install -y putty
```

Access Putty:

```s
putty
```

A new window should appear, asking for a Host Name or IP:

![alt text](putty_screen.png)

Enter the IP:  `104.41.25.156`

The login and password were sent via email along with the project delivery for security reasons. After logging in, you should see:

![alt text](afterlogin.png)

Now simply navigate to the directory `cd /var/www/final*` to access the files within the running server.

The machine was configured as described above, and access to the files can be done using the nano command.

Git is installed on the machine. It is necessary to use `sudo` to execute git commands.

You can access the page by clicking [here](http://104.41.25.156/front/)







