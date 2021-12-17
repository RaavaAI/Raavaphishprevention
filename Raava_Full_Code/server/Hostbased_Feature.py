from whois import whois
from waybackpy import Cdx
from socket import gethostbyname
from shodan import Shodan
from requests import get
from urllib.parse import urlparse
from datetime import datetime
from re import compile
from json import dump, loads
from time import sleep

class HostFeatures:
    def __init__(self, url):
        self.description = "This is a program for extracting host based feature of URLs"
        self.url = url
        self.urlparse = urlparse(self.url)
        self.host = self.__get_ip()
        self.now = datetime.now()
        self.init_sub_params = self.initialise_sub_parameters()

    def initialise_sub_parameters(self):
        self.whois = self.__get__whois_dict()
        self.shodan = self.__get_shodan_dict()
        self.snapshots = self.__get_site_snapshots()
        return True

    def __get_ip(self):
        try:
            ip = self.urlparse.netloc if self.url_host_is_ip() else gethostbyname(self.urlparse.netloc)
            return ip
        except:
            return None

    def __get__whois_dict(self):
        try:
            whois_dict = whois(self.host)
            return whois_dict
        except:
            return {}

    def __get_shodan_dict(self):
        api = Shodan('W6cy1PGcje0jJwKDBTgrqWSZioRpRmzg')
        try:
            host = api.host(self.host)
            return host
        except:
            return {}

    def __parse__before__date(self, date_string):
        month_year = date_string.split()[-1]
        d = '01-{}'.format(month_year)
        d = datetime.strptime(d, '%d-%b-%Y')
        return d

    def __parse_whois_date(self, date_key):
        cdate = self.whois.get(date_key, None)
        if cdate:
            if isinstance(cdate, str) and 'before' in cdate:
                d = self.__parse__before__date(cdate)
            elif isinstance(cdate, list):
                d = cdate[0]
            else:
                d = cdate
        return d if cdate else cdate

    def __get_site_snapshots(self):
        try:
            snapshots = Cdx(self.urlparse.netloc).snapshots()
            snapshots = [snapshot.datetime_timestamp for snapshot in snapshots]
            return snapshots
        except:
            return []

    def url_host_is_ip(self):
        try:
            host = self.urlparse.netloc
            pattern = compile("^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$")
            match = pattern.match(host)
            if match is not None:
                return 0
            else:
                return 1
        except:
            return 1

    def number_of_subdomains(self):
        try:
            ln1 = self.whois.get('nets', None, timeout=20)
            ln2 = self.shodan.get('domains', None, timeout=20)
            ln = ln1 or ln2
            return len(ln) if ln else None
        except:
            return 1

    def url_creation_date(self):
        try:
            d = self.__parse_whois_date('creation_date')
            return 0
        except:
            return 1

    def url_expiration_date(self):
        try:
            d = self.__parse_whois_date('expiration_date')
            return 0
        except:
            return 1

    def url_last_updated(self):
        try:
            d = self.__parse_whois_date('updated_date')
            return d
        except:
            return 1

    def url_age(self):
        try:
            days = (self.now - self.__parse_whois_date('creation_date')).days
            months = days/30
            if months < 6:
                return 1
            else:
                return 0
        except:
            days = 1
        return days

    def url_intended_life_span(self):
        try:
            lifespan = (self.url_expiration_date() - self.url_creation_date()).days
            years = lifespan/30
            if years <= 12:
                return 1
            else:
                return 0
        except:
            lifespan = 1
        return 1

    def url_life_remaining(self):
        try:
            rem = (self.url_expiration_date() - self.now).days
        except:
            rem = None
        return rem

    def url_registrar(self):
        return self.whois.get('registrar', None, timeout=20)

    def url_registration_country(self):
        c = self.whois.get('country', None, timeout=20)
        return c

    def url_host_country(self):
        c = self.shodan.get('country_name', None, timeout=20)
        return c

    def url_open_ports(self):
        try:
            ports = self.shodan.get('ports', '')
            legitports = [21,22,23,445,1433,1521,3306,3389]
            for i in range(len(legitports)):
                if legitports[i] in ports:
                    return ports 
                else:
                    return 0
        except:
            return 1
    
    def tls_check(self):
        try:
            ports = self.shodan.get('ports', '')
            legitports = [21,22,23,445,1433,1521,3306,3389]
            for i in range(len(legitports)):
                if legitports[i] in ports:
                    return ports 
                else:
                 return 0
        except:
            return 1

    def url_num_open_ports(self):
        try:
            ports = self.url_open_ports()
            lp = len(ports) if ports else 0
            return lp
        except:
            return 1

    def url_is_live(self):
        url = '{}://{}'.format(self.urlparse.scheme, self.urlparse.netloc)
        try:
            return get(url, timeout=10).status_code == 200
        except:
            return False

    def url_isp(self):
        return self.shodan.get('isp', '', timeout=20)

    def url_connection_speed(self):
        url = '{}://{}'.format(self.urlparse.scheme, self.urlparse.netloc)
        if self.url_is_live():
            return get(url, timeout=10).elapsed.total_seconds()
        else:
            return None

    def first_seen(self):
        try:
            fs = self.snapshots[0]
            return fs
        except:
            return datetime.now()

    def get_os(self):
        oss = self.shodan.get('os', None, timeout=20)
        return oss

    def last_seen(self):
        try:
            ls = self.snapshots[-1]
            return ls
        except:
            return datetime.now()

    def days_since_last_seen(self):
        dsls = (self.now - self.last_seen()).days
        return dsls

    def days_since_first_seen(self):
        dsfs = (self.now - self.first_seen()).days
        return dsfs

    def average_update_frequency(self):
        snapshots = self.snapshots
        diffs = [(t-s).days for s, t in zip(snapshots, snapshots[1:])]
        l = len(diffs)
        if l > 0:
            return sum(diffs)/l
        else:
            return 0

    def number_of_updates(self):
        return len(self.snapshots)

    def ttl_from_registration(self):
        earliest_date_seen = self.first_seen()
        try:
            ttl_from_reg = (earliest_date_seen - self.url_creation_date()).days
        except:
            ttl_from_reg = None
        return ttl_from_reg