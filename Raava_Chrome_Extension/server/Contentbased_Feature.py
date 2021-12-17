from urllib.parse import urlparse
from pyquery import PyQuery
from requests import get
from socket import gethostbyname
from numpy import array, log
from string import punctuation
from json import dump, loads
from re import compile

class ContentFeatures:
    def __init__(self, url):
        self.description = "This is a program for extracting content-based features of URLs"
        self.url = url
        self.urlparse = urlparse(self.url)
        self.html = self.__get_html()
        self.pq = self.__get_pq()
        self.scripts = self.__get_scripts()
        # self.valid_tags = vd
        # self.suspicious_functions = sf
        self.host = self.__get_ip()

    def __get_ip(self):
        try:
            ip = self.urlparse.netloc if self.url_host_is_ip() else gethostbyname(self.urlparse.netloc)
            return ip
        except:
            return None


    def url_host_is_ip(self):
        host = self.urlparse.netloc
        pattern = compile("^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$")
        match = pattern.match(host)
        return match is not None

    def __get_html(self):
        try:
            html = get(self.url, timeout=5)
            html = html.text if html else None
        except:
            html = None
        return html

    def __get_pq(self):
        try:
            pq = PyQuery(self.html) if self.html else None
            return pq
        except:
            return None


    def __get_scripts(self):
        scripts = self.pq('script') if self.pq else None
        return scripts

    def __get_entropy(self, text):
        text = text.lower()
        probs = [text.count(c) / len(text) for c in set(text)]
        return -sum([p * log(p) / log(2.0) for p in probs])

    # extract content-based features
    def url_page_entropy(self):
        return self.__get_entropy(self.html)

    def number_of_script_tags(self):
        return len(self.scripts) if self.scripts else None

    def script_to_body_ratio(self):
        if self.scripts:
            scripts = self.scripts.text()
            return len(scripts)/self.length_of_html()
        else:
            return None

    def length_of_html(self):
        return len(self.html)

    def number_of_page_tokens(self):
        html_tokens = len(self.html.lower().split()) if self.html else None
        return html_tokens

    def number_of_sentences(self):
        html_sentences = len(self.html.split('.')) if self.html else None
        return html_sentences

    def number_of_punctuations(self):
        excepts = ['<', '>', '/']
        matches = [i for i in self.html if i in punctuation and i not in excepts]
        return len(matches)

    def number_of_distinct_tokens(self):
        html_tokens = [i.strip() for i in self.html.lower().split()]
        return len(set(html_tokens))

    def number_of_capitalizations(self):
        uppercases = [i for i in self.html if i.isupper()]
        return len(uppercases)

    def average_number_of_tokens_in_sentence(self):
        html_sentences = self.html.split('.')
        sen_lens = [len(i.split()) for i in html_sentences]
        return sum(sen_lens)/len(sen_lens)

    def number_of_html_tags(self):
        return len(self.pq('*')) if self.pq else None

    def number_of_hidden_tags(self):
        try:
            hidden1, hidden2 = self.pq('.hidden'), self.pq('#hidden')
            hidden3, hidden4 = self.pq('*[visibility="none"]'), self.pq('*[display="none"]')
            hidden = hidden1 + hidden2 + hidden3 + hidden4
            return len(hidden)
        except:
            return "timeout"

    def number_iframes(self):
        try:
            iframes = self.pq('iframe') + self.pq('frame')
            return len(iframes)
        except:
            return "timeout"

    def number_objects(self):
        objects = self.pq('object')
        return len(objects)

    def number_embeds(self):
        objects = self.pq('embed')
        return len(objects)

    def number_of_hyperlinks(self):
        try:
            hyperlinks = self.pq('a')
            return len(hyperlinks)
        except:
            return "timeout"

    def number_of_whitespace(self):
        whitespaces = [i for i in self.html if i == ' ']
        return len(whitespaces)

    def number_of_included_elements(self):
        toi = self.pq('script') + self.pq('iframe') + self.pq('frame') + self.pq('embed') + self.pq('form') + self.pq('object')
        toi = [tag.attr('src') for tag in toi.items()]
        return len([i for i in toi if i])

    def number_of_suspicious_elements(self):
        all_tags = [i.tag for i in self.pq('*')]
        suspicious = [i for i in all_tags if i not in self.valid_tags]
        return len(suspicious)

    def number_of_double_documents(self):
        tags = self.pq('html') + self.pq('body') + self.pq('title')
        return len(tags) - 3

    def number_of_eval_functions(self):
        scripts = self.pq('script')
        scripts = ['eval' in script.text().lower() for script in scripts.items()]
        return sum(scripts)

    def average_script_length(self):
        scripts = self.pq('script')
        scripts = [len(script.text()) for script in scripts.items()]
        l = len(scripts)
        if l > 0:
            return sum(scripts) / l
        else:
            return 0

    def average_script_entropy(self):
        scripts = self.pq('script')
        scripts = [self.__get_entropy(script.text()) for script in scripts.items()]
        l = len(scripts)
        if l > 0:
            return sum(scripts) / l
        else:
            return 0

    def number_of_suspicious_functions(self):
        script_content = self.pq('script').text()
        susf = [1 if i in script_content else 0 for i in self.suspicious_functions]
        return sum(susf)