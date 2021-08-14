from django.db import models
from django.db.models.fields import BooleanField, CharField
from django.db.models.fields.related import ForeignKey
from django.urls import reverse
from users.models import User
from core import models as core_models
from tagging.fields import TagField
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here
class Post(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=50)
    problem_choices = (
        ("==선택==", "==선택=="),
        ("해결", "해결"),
        ("미해결", "미해결"),
    )
    problem_solving = models.CharField(
        verbose_name="해결/미해결", max_length=10, choices=problem_choices, blank=False
    )
    os_choices = (
        ("==선택==", "==선택=="),
        ("전체", "전체"),
        ("window", "window"),
        ("linux", "linux"),
        ("ubuntu", "ubuntu"),
        ("macos", "macos"),
    )
    language_choices = (
        ("==선택==", "==선택=="),
        ("전체", "전체"),
        ("ABAP", "ABAP"),
        ("Arduino", "Arduino"),
        ("Bash", "Bash"),
        ("C", "C"),
        ("Clojure", "Clojure"),
        ("CoffeeScript", "CoffeeScript"),
        ("C++", "C++"),
        ("C#", "C#"),
        ("CSS", "CSS"),
        ("Dart", "Dart"),
        ("Diff", "Diff"),
        ("Docker", "Docker"),
        ("Elixir", "Elixir"),
        ("Elm", "Elm"),
        ("Erlang", "Erlang"),
        ("Flow", "Flow"),
        ("Fortran", "Fortran"),
        ("F#", "F#"),
        ("Gherkin", "Gherkin"),
        ("GLSL", "GLSL"),
        ("Go", "Go"),
        ("GraphQL", "GraphQL"),
        ("Groovy", "Groovy"),
        ("Haskell", "Haskell"),
        ("HTML", "HTML"),
        ("Java", "Java"),
        ("JavaScript", "JavaScript"),
        ("JSON", "JSON"),
        ("julia", "julia"),
        ("Kotlin", "Kotlin"),
        ("LaTeX", "LaTeX"),
        ("Less", "Less"),
        ("Lisp", "Lisp"),
        ("LiveScript", "LiveScript"),
        ("Lua", "Lua"),
        ("Markfile", "Markfile"),
        ("Markdown", "Markdown"),
        ("Markup", "Markup"),
        ("MATLAB", "MATLAB"),
        ("Mermaid", "Mermaid"),
        ("Nix", "Nix"),
        ("Objective-C", "Objective-C"),
        ("OCaml", "OCaml"),
        ("Pascal", "Pascal"),
        ("Perl", "Perl"),
        ("PHP", "PHP"),
        ("Plain Text", "Plain Text"),
        ("PowerShell", "PowerShell"),
        ("Prolog", "Prolog"),
        ("Python", "Python"),
        ("R", "R"),
        ("Reason", "Reason"),
        ("Ruby", "Ruby"),
        ("Rust", "Rust"),
        ("Sass", "Sass"),
        ("Scala", "Scala"),
        ("Scheme", "Scheme"),
        ("Scss", "Scss"),
        ("Shell", "Shell"),
        ("SQL", "SQL"),
        ("Swift", "Swift"),
        ("TypeScript", "TypeScript"),
        ("VB.NET", "VB.NET"),
        ("Verilog", "Verilog"),
        ("VHDL", "VHDL"),
        ("Visual Basic", "Visual Basic"),
        ("WebAssembly", "WebAssembly"),
        ("XML", "XML"),
        ("YAML", "YAML"),
    )
    framework_choices = (
        ("==선택==", "==선택=="),
        ("전체", "전체"),
        ("AIOHTTP", "AIOHTTP"),
        ("Angular.js", "Angular.js"),
        ("Backbone.js", "Backbone.js"),
        ("Bootstrap", "Bootstrap"),
        ("Bottle", "Bottle"),
        ("Bulma", "Bulma"),
        ("CakePHP", "CakePHP"),
        ("CherryPy", "CherryPy"),
        ("CodeIgniter", "CodeIgniter"),
        ("CubicWeb", "CubicWeb"),
        ("Dash", "Dash"),
        ("Django", "Django"),
        ("Express.js", "Express.js"),
        ("Falcon", "Falcon"),
        ("Flask", "Flask"),
        ("Foundation", "Foundation"),
        ("FuelPHP", "FuelPHP"),
        ("Giotto", "Giotto"),
        ("Growler", "Growler"),
        ("Hug", "Hug"),
        ("Laravel", "Laravel"),
        ("Materialize", "Materialize"),
        ("MeteorJS", "MeteorJS"),
        ("Miligram", "Miligram"),
        ("Next.js", "Next.js"),
        ("Node.js", "Node.js"),
        ("Nuxt.js", "Nuxt.js"),
        ("PHPixie", "PHPixie"),
        ("Phalcon", "Phalcon"),
        ("Pure", "Pure"),
        ("Pylons", "Pylons"),
        ("Pyramid", "Pyramid"),
        ("Rails", "Rails"),
        ("React", "React"),
        ("STRUTS", "STRUTS"),
        ("Sails.js", "Sails.js"),
        ("Sanic", "Sanic"),
        ("Semantic UI", "Semantic UI"),
        ("Skeleton", "Skeleton"),
        ("Slim", "Slim"),
        ("Spring", "Spring"),
        ("Symfony", "Symfony"),
        ("Tailwind", "Tailwind"),
        ("Tornado", "Tornado"),
        ("TurboGears", "TurboGears"),
        ("Vue.js", "Vue.js"),
        ("Web2Py", "Web2Py"),
        ("Yii 2", "Yii 2"),
        ("Zend", "Zend"),
    )
    os = models.CharField(
        verbose_name="운영체제", max_length=10, choices=os_choices, blank=False
    )
    language = models.CharField(
        verbose_name="언어", max_length=20, choices=language_choices, blank=False
    )
    framework = models.CharField(
        verbose_name="프레임워크", max_length=20, choices=framework_choices, blank=False
    )
    error_message = models.TextField(verbose_name="에러메세지", blank=True)
    image = models.ImageField(
        verbose_name="게시물 사진", upload_to="images/posts", blank=True, null=True
    )
    # desc = models.TextField(verbose_name="설명", blank=False)
    desc = RichTextUploadingField(verbose_name="설명", blank=False, config_name="default")
    # code = models.TextField(verbose_name="코드", blank=True)
    code = RichTextUploadingField(verbose_name="코드", blank=True, config_name="default")

    tag = TagField(verbose_name="태그", blank=False)
    folder = models.ManyToManyField(
        "Folder",
        related_name="related_posts",
        blank=True,
    )
    is_public = models.BooleanField(
        verbose_name="전체공개", default=True
    )  # 해당코드 false로 변경시 비공개
    is_friend = models.BooleanField(verbose_name="이웃공개", default=False)  # 나를 팔로잉 하는 사람.
    scrap_num = models.IntegerField(default=0)
    helped_num = models.IntegerField(default=0)

    objects = models.Manager()


class Folder(core_models.TimeStampModel):
    folder_name = models.CharField(max_length=100)
    folder_user = models.ForeignKey(
        "users.User", related_name="folder_user", on_delete=models.CASCADE
    )
    # user = models.ForeignKey("users.User", related_name="user", on_delete=models.CASCADE)
    kind_choices = (
            ("framework", "framework"),
            ("language", "language"),
            ("solved", "solved"),
        )
    folder_kind = models.CharField(verbose_name="폴더 종류", max_length=10, choices=kind_choices, blank=False)


    def __str__(self):
        return self.folder_name

    # def name(self):
    #    return self.related_posts.language

    # def post_count(self):
    #    return self.related_posts.count()

    # post_count.short_description = "number of posts saved"
