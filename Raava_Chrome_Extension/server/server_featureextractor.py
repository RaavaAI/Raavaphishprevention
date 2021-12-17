import requests
from urllib.parse import urlparse, urlencode
import ipaddress
import re
from bs4 import BeautifulSoup
import whois
import urllib
import urllib.request
import socket
import ssl
from Lexical_Feature import LexicalURLFeature
from Contentbased_Feature import ContentFeatures
from Hostbased_Feature import HostFeatures

def getDomain(url):
    domain = urlparse(url).netloc
    if re.match(r"www.", domain):
        domain = domain.replace("www.","")
    return domain

# check if IP address is used instead of domain name (1 = phishing, 0 = legitimate)
def checkIPaddress(url):
    try:
        ipaddress.ip_address(url)
        return 1
    except:
        return 0

# check for '@' symbol in URL (1 = phishing, 0 = legitimate)
def checkAtSign(url):
    if "@" in url:
        at = 1
    else:
        at = 0
    return at

# check URL length, if length > 54 = phishing (1 = phishing, 0 = legitimate)
def getUrlLength(url):
    if len(url) < 54:
        length = 0
    else:
        length = 1
    return length

# check URL depths by count the '/' in URL
def getDepth(url):
    slash = urlparse(url).path.split('/')
    depth = 0
    for i in range(len(slash)):
        if len(slash[i]) != 0:
            depth += 1
    return depth

# check for URL redirection '//' in URL (1 = phishing, 0 = legitimate)
def redirection(url):
    pos = url.rfind('//')
    if pos > 6:
        if pos > 7:
            return 1
        else:
            return 0
    else:
        return 0

# check if there's 'https' in part of the url (1 = phishing, 0 = legitimate)
def checkHttps(url):
    domain = urlparse(url).netloc
    if 'https' in domain:
        return 1
    else:
        return 0

# check for URL shortening (1 = phishing, 0 = legitimate)

shortening_services = r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|" \
                        r"yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|" \
                        r"short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|" \
                        r"doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|db\.tt|" \
                        r"qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|q\.gs|is\.gd|" \
                        r"po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|x\.co|" \
                        r"prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|" \
                        r"tr\.im|link\.zip\.net"
# check for the URL shotening
def checkUrlShort(url):
    match = re.search(shortening_services, url)
    if match:
        return 1
    else:
        return 0

# check for prefix or suffix '-' (1 = phishing, 0 = legitimate)
def prefixSuffix(url):
    if '-' in urlparse(url).netloc:
        return 1
    else:
        return 0

# check for subdomains and multi-subdomains, 0-1 "." = legit, 2 = suspicious, > 2 = phishing
def checkSubdomains(domain):
    dot = domain.count('.')
    if dot > 2 :
        return 1
    else:
        return 0

# check domain register
def is_registered(domain_name):
    try:
        whoisdat = whois.whois(domain_name, timeout=30)
        null = 0
        for attribute, value in whoisdat.items():
            if value is None:
                null += 1
        if null > (len(whoisdat)/2):
            return 1
        else:
            return 0
    except Exception:
        return 1

def web_traffic(url):
  try:
    #Filling the whitespaces in the URL if any
    domain = urlparse(url).netloc
    rank = BeautifulSoup(urllib.request.urlopen("http://data.alexa.com/data?cli=10&dat=s&url=" + domain).read(), "xml").find(
        "REACH")['RANK']
    rank = int(rank)
  except TypeError:
        return 1
  if rank >100000:
    return 1
  else:
    return 0

# status Bar Customization (1 = phishing, 0 = legitimate)
def statusBarCustomization(url):
    try:
        response = requests.get(url, timeout=10)
    except:
        response = ""
    if response == "":
        return 1
    else:
        if re.findall("<script>.+onmouseover.+</script>", response.text):
            return 1
        else:
            return 0

# right click disabled (1 = phishing, 0 = legitimate)
def rightClickDisable(url):
    try:
        response = requests.get(url, timeout=10)
    except:
        response = ""
    if response == "":
        return 1
    else:
        if re.findall(r"event.button ?== ?2", response.text):
            return 0
        else:
            return 1

# website forwarding (1 = phishing, 0 = legitimate)
def checkIfForward(url):
    try:
        response = requests.get(url,timeout=10)
    except:
        response = ""
    if response == "":
        return 1
    else:
        if len(response.history) <= 2:
            return 0
        else:
            return 1

# IFrame redirection and Frameborder manipulation (1 = phishing, 0 = legitimate)
def iframeRedirection(url):
    try:
        response = requests.get(url, timeout=10)
    except:
        response = ""
    if response == "":
        return 1
    else:
        if re.findall(r"[<iframe>|<frameBorder>]",response.text):
            return 0
        else:
            return 1

def checkssl(hostname):
    try:
        ssl_date_fmt = r'%b %d %H:%M:%S %Y %Z'
        context = ssl.create_default_context()
        conn = context.wrap_socket(socket.socket(socket.AF_INET),server_hostname=hostname,)
        conn.settimeout(3.0)
        conn.connect((hostname, 443))
        ssl_info = conn.getpeercert()
        # SSLChecker.checker(hostname)
        print("ada")
        return 0
    except:
        return 1

def featureExtractor(url):
    lf = LexicalURLFeature(url)
    cf = ContentFeatures(url)
    hf = HostFeatures(url)
    print(getDomain(url))
    features = []
    features.append(checkIPaddress(url))
    features.append(checkAtSign(url))
    features.append(getUrlLength(url))
    features.append(getDepth(url))
    features.append(redirection(url))
    features.append(checkHttps(url))
    features.append(checkUrlShort(url))
    features.append(prefixSuffix(url))
    features.append(checkSubdomains(url))
    features.append(is_registered(url))
    features.append(lf.number_of_parameters())
    features.append(lf.number_of_periods())
    features.append(web_traffic(url))
    features.append(statusBarCustomization(url))
    features.append(checkIfForward(url))
    features.append(checkssl(getDomain(url)))
    features.append(iframeRedirection(url))
    features.append(hf.url_age())

    return features
