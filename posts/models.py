from django.db import models
from django.db.models.fields import BooleanField, CharField
from django.db.models.fields.related import ForeignKey
from django.urls import reverse
from users.models import User
from core import models as core_models
from tagging.fields import TagField

# Create your models here.


class Post(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=50)
    problem_solving = models.BooleanField(verbose_name="문제해결 여부", default=False)
    os_choices = (
        ("window", "window"),
        ("linux", "linux"),
        ("ubuntu", "ubuntu"),
        ("macos", "macos"),
    )
    language_choices = (
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
    os = models.CharField(
        verbose_name="운영체제", max_length=10, choices=os_choices, blank=False
    )
    language = models.CharField(
        verbose_name="언어", max_length=20, choices=language_choices, blank=False
    )
    error_message = models.TextField(verbose_name="에러메세지", blank=True)
    image = models.ImageField(
        verbose_name="게시물 사진", upload_to="images/posts", blank=True, null=True
    )
    desc = models.TextField(verbose_name="설명", blank=False)
    code = models.TextField(verbose_name="코드", blank=True)

    tag = TagField(verbose_name="태그", blank=False)
    folder = models.ForeignKey(
        "Folder",
        related_name="related_posts",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    custom_folder = models.ForeignKey(
        "CustomFolder",
        related_name="custom_selected_posts",
        on_delete=models.SET_NULL,
        null=True,
    )
    is_public = models.BooleanField(
        verbose_name="전체공개", default=True
    )  # 해당코드 false로 변경시 비공개
    is_friend = models.BooleanField(verbose_name="이웃공개", default=False)  # 나를 팔로잉 하는 사람.


class Folder(core_models.TimeStampModel):
    folder_name = models.CharField(max_length=100)

    def __str__(self):
        return self.folder_name

    # def name(self):
    #    return self.related_posts.language

    # def post_count(self):
    #    return self.related_posts.count()

    # post_count.short_description = "number of posts saved"


class CustomFolder(Folder):
    name = CharField(max_length=150, blank=False)

    def __str__(self):
        return self.name

    def custom_folder_posts_count(self):
        return self.custom_selected_posts.count()

    custom_folder_posts_count.short_description = "number of posts saved"
