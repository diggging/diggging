from django.db import models
from core import models as core_models
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings

# Create your models here.
class QuestionPost(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="question_user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=200)
    desc = models.TextField(verbose_name="설명", blank=False)
    code = models.TextField(verbose_name="코드", blank=True)

    question_folder = models.ManyToManyField(
        "QuestionFolder",
        related_name="question_folder",
        blank=True,
    )

    is_public = models.BooleanField(
        verbose_name="전체공개", default=True
    )  # 해당코드 false로 변경시 비공개

    is_friend = models.BooleanField(verbose_name="이웃공개", default=False)  # 나를 팔로잉 하는 사람.

    scrap_num = models.IntegerField(default=0)
    helped_num = models.IntegerField(default=0)
    likes_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="question_likes_user",
    )
    scarps_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="question_scarps_user",
    )

    is_selected = models.BooleanField(default=False)

    # objects = models.Manager()  # 손씨한테 물어봐야함

    # os_choices = (
    #     ("==선택==", "==선택=="),
    #     ("전체", "전체"),
    #     ("window", "window"),
    #     ("linux", "linux"),
    #     ("ubuntu", "ubuntu"),
    #     ("macos", "macos"),
    # )
    # language_choices = (
    #     ("==선택==", "==선택=="),
    #     ("전체", "전체"),
    #     ("ABAP", "ABAP"),
    #     ("Arduino", "Arduino"),
    #     ("Bash", "Bash"),
    #     ("C", "C"),
    #     ("Clojure", "Clojure"),
    #     ("CoffeeScript", "CoffeeScript"),
    #     ("C++", "C++"),
    #     ("C#", "C#"),
    #     ("CSS", "CSS"),
    #     ("Dart", "Dart"),
    #     ("Diff", "Diff"),
    #     ("Docker", "Docker"),
    #     ("Elixir", "Elixir"),
    #     ("Elm", "Elm"),
    #     ("Erlang", "Erlang"),
    #     ("Flow", "Flow"),
    #     ("Fortran", "Fortran"),
    #     ("F#", "F#"),
    #     ("Gherkin", "Gherkin"),
    #     ("GLSL", "GLSL"),
    #     ("Go", "Go"),
    #     ("GraphQL", "GraphQL"),
    #     ("Groovy", "Groovy"),
    #     ("Haskell", "Haskell"),
    #     ("HTML", "HTML"),
    #     ("Java", "Java"),
    #     ("JavaScript", "JavaScript"),
    #     ("JSON", "JSON"),
    #     ("julia", "julia"),
    #     ("Kotlin", "Kotlin"),
    #     ("LaTeX", "LaTeX"),
    #     ("Less", "Less"),
    #     ("Lisp", "Lisp"),
    #     ("LiveScript", "LiveScript"),
    #     ("Lua", "Lua"),
    #     ("Markfile", "Markfile"),
    #     ("Markdown", "Markdown"),
    #     ("Markup", "Markup"),
    #     ("MATLAB", "MATLAB"),
    #     ("Mermaid", "Mermaid"),
    #     ("Nix", "Nix"),
    #     ("Objective-C", "Objective-C"),
    #     ("OCaml", "OCaml"),
    #     ("Pascal", "Pascal"),
    #     ("Perl", "Perl"),
    #     ("PHP", "PHP"),
    #     ("Plain Text", "Plain Text"),
    #     ("PowerShell", "PowerShell"),
    #     ("Prolog", "Prolog"),
    #     ("Python", "Python"),
    #     ("R", "R"),
    #     ("Reason", "Reason"),
    #     ("Ruby", "Ruby"),
    #     ("Rust", "Rust"),
    #     ("Sass", "Sass"),
    #     ("Scala", "Scala"),
    #     ("Scheme", "Scheme"),
    #     ("Scss", "Scss"),
    #     ("Shell", "Shell"),
    #     ("SQL", "SQL"),
    #     ("Swift", "Swift"),
    #     ("TypeScript", "TypeScript"),
    #     ("VB.NET", "VB.NET"),
    #     ("Verilog", "Verilog"),
    #     ("VHDL", "VHDL"),
    #     ("Visual Basic", "Visual Basic"),
    #     ("WebAssembly", "WebAssembly"),
    #     ("XML", "XML"),
    #     ("YAML", "YAML"),
    # )
    # framework_choices = (
    #     ("==선택==", "==선택=="),
    #     ("전체", "전체"),
    #     ("AIOHTTP", "AIOHTTP"),
    #     ("Angular.js", "Angular.js"),
    #     ("Backbone.js", "Backbone.js"),
    #     ("Bootstrap", "Bootstrap"),
    #     ("Bottle", "Bottle"),
    #     ("Bulma", "Bulma"),
    #     ("CakePHP", "CakePHP"),
    #     ("CherryPy", "CherryPy"),
    #     ("CodeIgniter", "CodeIgniter"),
    #     ("CubicWeb", "CubicWeb"),
    #     ("Dash", "Dash"),
    #     ("Django", "Django"),
    #     ("Express.js", "Express.js"),
    #     ("Falcon", "Falcon"),
    #     ("Flask", "Flask"),
    #     ("Foundation", "Foundation"),
    #     ("FuelPHP", "FuelPHP"),
    #     ("Giotto", "Giotto"),
    #     ("Growler", "Growler"),
    #     ("Hug", "Hug"),
    #     ("Laravel", "Laravel"),
    #     ("Materialize", "Materialize"),
    #     ("MeteorJS", "MeteorJS"),
    #     ("Miligram", "Miligram"),
    #     ("Next.js", "Next.js"),
    #     ("Node.js", "Node.js"),
    #     ("Nuxt.js", "Nuxt.js"),
    #     ("PHPixie", "PHPixie"),
    #     ("Phalcon", "Phalcon"),
    #     ("Pure", "Pure"),
    #     ("Pylons", "Pylons"),
    #     ("Pyramid", "Pyramid"),
    #     ("Rails", "Rails"),
    #     ("React", "React"),
    #     ("STRUTS", "STRUTS"),
    #     ("Sails.js", "Sails.js"),
    #     ("Sanic", "Sanic"),
    #     ("Semantic UI", "Semantic UI"),
    #     ("Skeleton", "Skeleton"),
    #     ("Slim", "Slim"),
    #     ("Spring", "Spring"),
    #     ("Symfony", "Symfony"),
    #     ("Tailwind", "Tailwind"),
    #     ("Tornado", "Tornado"),
    #     ("TurboGears", "TurboGears"),
    #     ("Vue.js", "Vue.js"),
    #     ("Web2Py", "Web2Py"),
    #     ("Yii 2", "Yii 2"),
    #     ("Zend", "Zend"),
    # )
    # os = models.CharField(verbose_name="운영체제", max_length=10, choices=os_choices, blank=False)
    # language = models.CharField(verbose_name="언어", max_length=20, choices=language_choices, blank=False)
    # framework = models.CharField(verbose_name="프레임워크", max_length=20, choices=framework_choices, blank=False)
    # error_message = models.TextField(verbose_name="에러메세지", blank=True)
    # image = models.ImageField( verbose_name="게시물 사진", upload_to="images/posts", blank=True, null=True, default='../static/image/default_image.PNG')
    # desc = RichTextUploadingField(verbose_name="설명", blank=False, config_name="default")
    # code = RichTextUploadingField(verbose_name="코드", blank=True, config_name="default")
    # sand_point = models.IntegerField(default=0)

    def count_likes_user(self):
        return self.likes_user.count()

    def count_scarps_user(self):
        return self.scarps_user.count()


# sand_point_count.short_description = "current sand point"

# 채택된 답변의 개수 세는 함수 이걸로 답변 채택 여부 확인 할 것임.
# def answer_selection_count(self):
#     answer_selection_count = 0
#     for answer_selected in self.answers.all():
#         if answer_selected:
#             answer_selection_count += 1

#     return answer_selection_count


class Answer(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="answer_user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=200)
    question = models.ForeignKey(
        "questions.QuestionPost", related_name="answers", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=False)
    # desc = RichTextUploadingField(verbose_name="설명", blank=False, config_name="default")
    # code = RichTextUploadingField(verbose_name="코드", blank=True, config_name="default")
    desc = models.TextField(verbose_name="설명", blank=False)
    code = models.TextField(verbose_name="코드", blank=True)

    # objects = models.Manager()


class QuestionFolder(core_models.TimeStampModel):
    folder_name = models.CharField(max_length=100)
    folder_user = models.ForeignKey(
        "users.User", related_name="question_folder_user", on_delete=models.CASCADE
    )
    # kind_choices = (
    #     ("framework", "framework"),
    #     ("language", "language"),
    #     ("solved", "solved"),
    # )
    # folder_kind = models.CharField(verbose_name="폴더 종류", max_length=10, choices=kind_choices, blank=False)

    def __str__(self):
        return self.folder_name
