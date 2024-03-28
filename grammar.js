module.exports = grammar({
  name: "hoon",
  rules: {
    source_file: ($) =>
      seq(
        optional($._Gap),
        $._hoonTall,
        repeat(seq($._Gap, $._hoonTall)),
        optional($._Gap)
      ),

    _hoonTall: ($) => choice($._runeTall, $._hoonWide),
    _hoonWide: ($) => choice($._runeWide, $._value, $._irregularForms),

    _specTall: ($) =>
      choice(
        $._bucTall,
        $._specWide,
        $.cenhepTall,
        $.cenlusTall,
        seq("$;", $._Gap, $._specTall)
      ), //TODO: add all cen runes
    _specWide: ($) =>
      choice(
        $.term,
        $.aura,
        $.typeUnion,
        prec.left(
          0,
          seq(
            choice($.parent, $.name),
            repeat(
              seq(":", choice($.parent, $.name, $.number, $.cell, $.stripFace))
            )
          )
        ), // $.composeExpressions,
        alias(
          prec.left(0, seq(optional($._specWide), "=", $._specWide)),
          $.wrapFace
        ), // $.wrapFace,
        $.mold,
        seq("[", $._specWide, repeat(seq($._space, $._specWide)), "]"), //$.cell
        $.normalize,
        $._bucWide,
        seq("$;", "(", $._specWide, ")"),
        $.gateCall,
        $.cenhepWide,
        $.cenlusWide,
        // $.wrapFace2,
        $.factoryGate
      ),
    _wingTall: ($) => choice($._wingWide, $.tisgalTall, $.tisgarTall),
    _wingWide: ($) =>
      choice(
        $.name,
        $.parent,
        $.gateCall,
        $.lark,
        $.wingPath,
        $.fullContext,
        $.specialIndex,
        $.wrapFace,
        $.tisgalWide,
        $.tisgarWide,
        $.cell
      ),
    // _skinTall: $ => choice($._skinWide),
    // _skinWide: $ => choice(
    //     $.name,
    //     $.mold,
    //     $.cell,
    //     $.gateCall,
    //     $.term,
    //     $.parent,
    //     $.normalize,
    //     $.aura,
    //     prec.left(0, seq($._skinWide, "=", choice($._skinWide, seq($.name, ":", $.name)))),
    //     seq("=", choice($._skinWide, seq($.name, ":", $.name))),
    // ),
    _skinTall: ($) => choice($._specTall, $.addCell),
    _skinWide: ($) => choice($._specWide, $.addCell),
    _termTall: ($) => choice($._termWide),
    _termWide: ($) => choice($.name, $.term),
    _tomeTall: ($) => choice($._tomeWide),
    _tomeWide: ($) => choice($.name),
    _studTall: ($) => choice($._studWide),
    _studWide: ($) => choice($.name),
    _chumTall: ($) => choice($._chumWide),
    _chumWide: ($) =>
      choice(seq($.term, repeat(seq(".", choice($.number, $.name))))),
    // _valueTall: $ => choice($._valueWide),
    // _valueWide: $ => choice(
    //     $.name,
    //     $.number
    // ),
    _valueTall: ($) => $._hoonTall,
    _valueWide: ($) => $._hoonWide,
    _labelTall: ($) => choice($._labelWide),
    _labelWide: ($) => choice($.name, $.term),

    _runeTall: ($) =>
      choice(
        $.barbucTall,
        $.barcabTall,
        $.barcolTall,
        $.barcenTall,
        $.bardotTall,
        $.barketTall,
        $.barhepTall,
        $.barsigTall,
        $.bartarTall,
        $.bartisTall,
        $.barpatTall,
        $.barwutTall,
        $._bucTall,
        $.cencabTall,
        $.cencolTall,
        $.cendotTall,
        $.cenhepTall,
        $.cenketTall,
        $.cenlusTall,
        $.censigTall,
        $.centarTall,
        $.centisTall,
        $.colhepTall,
        $.colcabTall,
        $.collusTall,
        $.colketTall,
        $.coltarTall,
        $.colsigTall,
        $.dotketTall,
        $.dotlusTall,
        $.dottarTall,
        $.dottisTall,
        $.dotwutTall,
        $.fashepTall,
        $.faslusTall,
        $.fastisTall,
        $.fastarTall,
        $.fasbucTall,
        $.fassigTall,
        $.fascenTall,
        $.faswutTall,
        $.ketbarTall,
        $.ketcolTall,
        $.ketdotTall,
        $.kethepTall,
        $.ketlusTall,
        $.ketpamTall,
        $.ketsigTall,
        $.kettarTall,
        $.kettisTall,
        $.ketwutTall,
        $.miccolTall,
        $.micgalTall,
        $.miclusTall,
        $.micmicTall,
        $.micfasTall,
        $.micsigTall,
        $.mictarTall,
        $.mictisTall,
        $.siggarTall,
        $.sigbarTall,
        $.sigbucTall,
        $.sigcabTall,
        $.sigcenTall,
        $.siggalTall,
        $.siglusTall,
        $.sigfasTall,
        $.sigpamTall,
        $.sigtisTall,
        $.sigwutTall,
        $.sigzapTall,
        $.tisgarTall,
        $.tisbarTall,
        $.tiscolTall,
        $.tiscomTall,
        $.tisdotTall,
        $.tishepTall,
        $.tisketTall,
        $.tisgalTall,
        $.tislusTall,
        $.tismicTall,
        $.tisfasTall,
        $.tissigTall,
        $.tistarTall,
        $.tiswutTall,
        $.wutbarTall,
        $.wuthepTall,
        $.wutcolTall,
        $.wutdotTall,
        $.wutketTall,
        $.wutgalTall,
        $.wutgarTall,
        $.wutlusTall,
        $.wutpamTall,
        $.wutpatTall,
        $.wutsigTall,
        $.wuttisTall,
        $.wutzapTall,
        $.zapcomTall,
        $.zapgarTall,
        $.zapgalTall,
        $.zapmicTall,
        $.zaptisTall,
        $.zapwutTall,
        $.zappatTall,
        $.zapcolTall,
        $.zapdotTall
      ),

    _runeWide: ($) =>
      choice(
        $.barbucWide,
        $.barcolWide,
        $.bardotWide,
        $.barhepWide,
        $.barsigWide,
        $.bartarWide,
        $.bartisWide,
        $.barwutWide,
        $._bucWide,
        $.cencabWide,
        $.cencolWide,
        $.cendotWide,
        $.cenhepWide,
        $.cenketWide,
        $.cenlusWide,
        $.censigWide,
        $.centarWide,
        $.centisWide,
        $.colhepWide,
        $.colcabWide,
        $.collusWide,
        $.colketWide,
        $.coltarWide,
        $.colsigWide,
        $.dotketWide,
        $.dotlusWide,
        $.dottarWide,
        $.dottisWide,
        $.dotwutWide,
        $.ketbarWide,
        $.ketcolWide,
        $.ketdotWide,
        $.kethepWide,
        $.ketlusWide,
        $.ketpamWide,
        $.ketsigWide,
        $.kettarWide,
        $.kettisWide,
        $.ketwutWide,
        $.miccolWide,
        $.micgalWide,
        $.miclusWide,
        $.micmicWide,
        $.micfasWide,
        $.micsigWide,
        $.mictarWide,
        $.mictisWide,
        $.siggarWide,
        $.sigbarWide,
        $.sigbucWide,
        $.sigcabWide,
        $.siggalWide,
        $.siglusWide,
        $.sigfasWide,
        $.sigpamWide,
        $.sigtisWide,
        $.sigwutWide,
        $.sigzapWide,
        $.tisgarWide,
        $.tisbarWide,
        $.tiscolWide,
        $.tiscomWide,
        $.tisdotWide,
        $.tishepWide,
        $.tisketWide,
        $.tisgalWide,
        $.tislusWide,
        $.tismicWide,
        $.tisfasWide,
        $.tissigWide,
        $.tistarWide,
        $.tiswutWide,
        $.wutbarWide,
        $.wuthepWide,
        $.wutcolWide,
        $.wutdotWide,
        $.wutketWide,
        $.wutgalWide,
        $.wutgarWide,
        $.wutlusWide,
        $.wutpamWide,
        $.wutpatWide,
        $.wutsigWide,
        $.wuttisWide,
        $.wutzapWide,
        $.zapcomWide,
        $.zapgarWide,
        $.zapgalWide,
        $.zapmicWide,
        $.zaptisWide,
        $.zapwutWide,
        $.zappatWide,
        $.zapcolWide,
        $.zapdotWide,
        $.zapzap
      ),

    _lusTall: ($) => choice($.luslusTall, $.lusbucTall, $.lusbarTall),

    _bucTall: ($) =>
      choice(
        $.bucbarTall,
        $.buccabTall,
        $.buccenTall,
        $.buccolTall,
        $.bucgalTall,
        $.bucgarTall,
        $.buchepTall,
        $.bucketTall,
        $.buclusTall,
        $.bucpamTall,
        $.bucsigTall,
        $.bucpatTall,
        $.buctisTall,
        $.bucwutTall
      ),
    _bucWide: ($) =>
      choice(
        $.bucbarWide,
        $.buccabWide,
        $.buccenWide,
        $.buccolWide,
        $.bucgalWide,
        $.bucgarWide,
        $.buchepWide,
        $.bucketWide,
        $.buclusWide,
        $.bucpamWide,
        $.bucsigWide,
        $.bucpatWide,
        $.buctisWide,
        $.bucwutWide
      ),
    rune: ($) => "感#)@!(",

    lusbarTall: ($) => seq(alias("+|", $.rune), $._Gap, $._labelTall),
    lusbucTall: ($) =>
      seq(alias("+$", $.rune), $._Gap, field('name', $.name), $._Gap, $._specTall),
    luslusTall: ($) =>
      seq(alias("++", $.rune), $._Gap, field('armName', $.name), $._Gap, field('armBody', $._hoonTall)),

    lustarTall: ($) =>
      seq(alias("+*", $.rune), repeat1(seq($._Gap, field('alias', $.name), $._Gap, $._hoonTall))),
    barbucTall: ($) =>
      seq(
        alias("|$", $.rune),
        $._Gap,
        choice($.name, seq("[", $.name, repeat(seq($._Gap, $.name)), "]")),
        $._Gap,
        $._specTall
      ),
    barcabTall: ($) =>
      seq(
        alias("|_", $.rune),
        $._Gap,
        $._specTall,
        $._Gap,
        choice($._lusTall, $.lustarTall),
        repeat(seq($._Gap, $._lusTall)),
        $._Gap,
        $.coreTerminator
      ),
    barcolTall: ($) =>
      seq(alias("|:", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    barcenTall: ($) =>
      seq(
        alias("|%", $.rune),
        $._Gap,
        $._lusTall,
        repeat(seq($._Gap, $._lusTall)),
        $._Gap,
        $.coreTerminator
      ),
    bardotTall: ($) => seq(alias("|.", $.rune), $._Gap, $._hoonTall),
    barketTall: ($) =>
      seq(
        alias("|^", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._lusTall,
        repeat(seq($._Gap, $._lusTall)),
        $._Gap,
        $.coreTerminator
      ),
    barhepTall: ($) => seq(alias("|-", $.rune), $._Gap, $._hoonTall),
    barsigTall: ($) =>
      seq(alias("|~", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    bartarTall: ($) =>
      seq(alias("|*", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    bartisTall: ($) =>
      seq(alias("|=", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    barpatTall: ($) =>
      seq(
        alias("|@", $.rune),
        $._Gap,
        $._lusTall,
        repeat(seq($._Gap, $._lusTall)),
        $._Gap,
        $.coreTerminator
      ),
    barwutTall: ($) => seq(alias("|?", $.rune), $._Gap, $._hoonTall),
    bucbarTall: ($) =>
      seq(alias("$|", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    buccabTall: ($) => seq(alias("$_", $.rune), $._Gap, $._hoonTall),
    buccenTall: ($) =>
      seq(
        alias("$%", $.rune),
        $._Gap,
        repeat1(seq($._specTall, $._Gap)),
        $.seriesTerminator
      ),
    buccolTall: ($) =>
      seq(
        alias(seq("$", ":"), $.rune),
        $._Gap,
        repeat1(seq($._specTall, $._Gap)),
        $.seriesTerminator
      ),
    bucgalTall: ($) =>
      seq(alias("$<", $.rune), $._Gap, $._specTall, $._Gap, $._specTall),
    bucgarTall: ($) =>
      seq(alias("$>", $.rune), $._Gap, $._specTall, $._Gap, $._specTall),
    buchepTall: ($) =>
      seq(alias("$-", $.rune), $._Gap, $._specTall, $._Gap, $._specTall),
    bucketTall: ($) =>
      seq(alias("$^", $.rune), $._Gap, $._specTall, $._Gap, $._specTall),
    buclusTall: ($) =>
      seq(alias(seq("$", "+"), $.rune), $._Gap, $._studTall, $._Gap, $._specTall),
    bucpamTall: ($) =>
      seq(alias("$&", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    bucsigTall: ($) =>
      seq(alias("$~", $.rune), $._Gap, $._hoonTall, $._Gap, $._specTall),
    bucpatTall: ($) =>
      seq(alias("$@", $.rune), $._Gap, $._specTall, $._Gap, $._specTall),
    buctisTall: ($) =>
      seq(alias("$=", $.rune), $._Gap, $._skinTall, $._Gap, $._specTall),
    bucwutTall: ($) =>
      seq(
        alias("$?", $.rune),
        $._Gap,
        repeat1(seq($._specTall, $._Gap)),
        $.seriesTerminator
      ),
    cencabTall: ($) =>
      seq(
        alias("%_", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        repeat1(seq($._wingTall, $._Gap, $._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    cencolTall: ($) =>
      seq(
        alias("%:", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    cendotTall: ($) =>
      seq(alias(seq("%", "."), $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    cenhepTall: ($) =>
      seq(alias("%-", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    cenketTall: ($) =>
      seq(
        alias("%^", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    cenlusTall: ($) =>
      seq(
        alias("%+", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    censigTall: ($) =>
      seq(
        alias(seq("%", "~"), $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    centarTall: ($) =>
      seq(
        alias("%*", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        repeat1(seq($._wingTall, $._Gap, $._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    centisTall: ($) =>
      seq(
        alias("%=", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        repeat1(seq($._wingTall, $._Gap, $._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    colhepTall: ($) =>
      seq(alias(":-", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    colcabTall: ($) =>
      seq(alias(":_", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    collusTall: ($) =>
      seq(
        alias(":+", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    colketTall: ($) =>
      seq(
        alias(":^", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    coltarTall: ($) =>
      seq(
        alias(":*", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    colsigTall: ($) =>
      seq(
        alias(":~", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),

    dotketTall: ($) =>
      seq(
        alias(".^", $.rune),
        $._Gap,
        $._specTall,
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    dotlusTall: ($) => seq(alias(".+", $.rune), $._Gap, $._hoonTall),
    dottarTall: ($) =>
      seq(alias(".*", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    dottisTall: ($) =>
      seq(alias(".=", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    dotwutTall: ($) => seq(alias(".?", $.rune), $._Gap, $._hoonTall),

    faslusTall: ($) =>
      seq(
        alias("/+", $.rune),
        $._Gap,
        optional("*"),
        $.name,
        optional(seq("=", $.name)),
        repeat(
          seq(
            ",",
            choice($._Gap, $._space),
            optional("*"),
            $.name,
            optional(seq("=", $.name))
          )
        )
      ),
    fashepTall: ($) =>
      seq(
        alias("/-", $.rune),
        $._Gap,
        optional("*"),
        $.name,
        optional(seq("=", $.name)),
        repeat(
          seq(
            ",",
            choice($._Gap, $._space),
            optional("*"),
            $.name,
            optional(seq("=", $.name))
          )
        )
      ),
    fastisTall: ($) => seq(alias("/=", $.rune), $._Gap, $.name, $._Gap, $.path),
    fastarTall: ($) =>
      seq(alias("/*", $.rune), $._Gap, $.name, $._Gap, $.term, $._Gap, $.path),
    fasbucTall: ($) =>
      seq(alias("/$", $.rune), $._Gap, $.name, $._Gap, $.term, $._Gap, $.term),
    fassigTall: ($) =>
      seq(
        alias("/~", $.rune),
        $._Gap,
        $.name,
        $._Gap,
        $._specWide,
        $._Gap,
        $.path
      ),
    fascenTall: ($) => seq(alias("/%", $.rune), $._Gap, $.name, $._Gap, $.term),
    faswutTall: ($) => seq(alias("/?", $.rune), $._Gap, $.number),
    ketbarTall: ($) => seq(alias("^|", $.rune), $._Gap, $._hoonTall),
    ketcolTall: ($) => seq(alias("^:", $.rune), $._Gap, $._specTall),
    ketdotTall: ($) =>
      seq(alias("^.", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    kethepTall: ($) =>
      seq(alias("^-", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    ketlusTall: ($) =>
      seq(alias("^+", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    ketpamTall: ($) => seq(alias("^&", $.rune), $._Gap, $._hoonTall),
    ketsigTall: ($) => seq(alias("^~", $.rune), $._Gap, $._hoonTall),
    kettarTall: ($) => seq(alias("^*", $.rune), $._Gap, $._specTall),
    kettisTall: ($) =>
      seq(alias("^=", $.rune), $._Gap, $._skinTall, $._Gap, $._hoonTall),
    ketwutTall: ($) => seq(alias("^?", $.rune), $._Gap, $._hoonTall),

    miccolTall: ($) =>
      seq(
        alias(";:", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    micgalTall: ($) =>
      seq(
        alias(";<", $.rune),
        $._Gap,
        $._specTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    miclusTall: ($) => seq(alias(";+", $.rune), $._Gap, $._hoonTall),
    micmicTall: ($) =>
      seq(alias(";;", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    micfasTall: ($) => seq(alias(";/", $.rune), $._Gap, $._hoonTall),
    micsigTall: ($) =>
      seq(
        alias(";~", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    mictarTall: ($) => seq(alias(";*", $.rune), $._Gap, $._hoonTall),
    mictisTall: ($) =>
      seq(
        alias(";=", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    siggarTall: ($) =>
      seq(
        alias("~>", $.rune),
        $._Gap,
        $._termWide,
        optional(seq(".", optional($._Gap), $._hoonTall)),
        $._Gap,
        $._hoonTall
      ),
    sigbarTall: ($) =>
      seq(alias("~|", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    sigbucTall: ($) =>
      seq(alias("~$", $.rune), $._Gap, $._termTall, $._Gap, $._hoonTall),
    sigcabTall: ($) =>
      seq(alias("~_", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    sigcenTall: ($) =>
      seq(
        alias("~%", $.rune),
        $._Gap,
        $._chumTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        choice(
          "~",
          seq(
            $.seriesTerminator,
            $._Gap,
            repeat1(seq($._hoonWide, $._Gap, $._hoonTall, $._Gap)),
            $.seriesTerminator
          )
        ),
        $._Gap,
        $._hoonTall
      ),
    siggalTall: ($) =>
      seq(
        alias("~<", $.rune),
        $._Gap,
        $._termWide,
        optional(seq(".", optional($._Gap), $._hoonTall)),
        $._Gap,
        $._hoonTall
      ),
    siglusTall: ($) => seq(alias("~+", $.rune), $._Gap, $._hoonTall),
    sigfasTall: ($) =>
      seq(alias("~/", $.rune), $._Gap, $._chumTall, $._Gap, $._hoonTall),
    sigpamTall: ($) =>
      seq(
        alias("~&", $.rune),
        $._Gap,
        optional(seq(choice(">", ">>", ">>>"), $._Gap)),
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    sigtisTall: ($) =>
      seq(alias("~=", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    sigwutTall: ($) =>
      seq(
        alias("~?", $.rune),
        $._Gap,
        optional(seq(choice(">", ">>", ">>>"), $._Gap)),
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    sigzapTall: ($) =>
      seq(alias("~!", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),

    tisgarTall: ($) =>
      seq(alias("=>", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    tisbarTall: ($) =>
      seq(alias("=|", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    tiscolTall: ($) =>
      seq(
        alias("=:", $.rune),
        $._Gap,
        repeat1(seq($._wingTall, $._Gap, $._hoonTall, $._Gap)),
        $.seriesTerminator,
        $._Gap,
        $._hoonTall
      ),
    tiscomTall: ($) =>
      seq(alias("=,", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    tisdotTall: ($) =>
      seq(
        alias("=.", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    tishepTall: ($) =>
      seq(alias("=-", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    tisketTall: ($) =>
      seq(
        alias("=^", $.rune),
        $._Gap,
        $._skinTall,
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    tisgalTall: ($) =>
      seq(alias("=<", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    tislusTall: ($) =>
      seq(alias("=+", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    tismicTall: ($) =>
      seq(
        alias("=;", $.rune),
        $._Gap,
        $._skinTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    tisfasTall: ($) =>
      seq(
        alias("=/", $.rune),
        $._Gap,
        field("name", $._skinTall),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    tissigTall: ($) =>
      seq(
        alias("=~", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    tistarTall: ($) =>
      seq(
        alias("=*", $.rune),
        $._Gap,
        choice($._termTall, seq($.name, "=", $._specWide)),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    tiswutTall: ($) =>
      seq(
        alias("=?", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),

    wutbarTall: ($) =>
      seq(
        alias("?|", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    wuthepTall: ($) =>
      seq(
        alias("?-", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        repeat1(seq($._specTall, $._Gap, $._valueTall, $._Gap)),
        $.seriesTerminator
      ),
    wutcolTall: ($) =>
      seq(
        alias(seq("?", ":"), $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    wutdotTall: ($) =>
      seq(
        alias("?.", $.rune),
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    wutketTall: ($) =>
      seq(
        alias("?^", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    wutgalTall: ($) =>
      seq(alias("?<", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    wutgarTall: ($) =>
      seq(alias("?>", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    wutlusTall: ($) =>
      seq(
        alias("?+", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        repeat1(seq($._specTall, $._Gap, $._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    wutpamTall: ($) =>
      seq(
        alias("?&", $.rune),
        $._Gap,
        repeat1(seq($._hoonTall, $._Gap)),
        $.seriesTerminator
      ),
    wutpatTall: ($) =>
      seq(
        alias("?@", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    wutsigTall: ($) =>
      seq(
        alias("?~", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    wuttisTall: ($) =>
      seq(alias("?=", $.rune), $._Gap, $._specTall, $._Gap, $._wingTall),
    wutzapTall: ($) => seq(alias("?!", $.rune), $._Gap, $._hoonTall),

    zapcomTall: ($) =>
      seq(alias("!,", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    zapgarTall: ($) => seq(alias("!>", $.rune), $._Gap, $._hoonTall),
    zapgalTall: ($) =>
      seq(alias("!<", $.rune), $._Gap, $._specTall, $._Gap, $._hoonTall),
    zapmicTall: ($) =>
      seq(alias("!;", $.rune), $._Gap, $._hoonTall, $._Gap, $._hoonTall),
    zaptisTall: ($) =>
      prec(1, seq(alias(seq("!", "="), $.rune), $._Gap, $._hoonTall)),
    zapwutTall: ($) =>
      prec(
        1,
        seq(
          alias(seq("!", "?"), $.rune),
          $._Gap,
          choice($.number, seq("[", $.number, $._space, $.number, "]")),
          $._Gap,
          $._hoonTall
        )
      ),
    zappatTall: ($) =>
      seq(
        alias("!@", $.rune),
        $._Gap,
        $._wingTall,
        $._Gap,
        $._hoonTall,
        $._Gap,
        $._hoonTall
      ),
    zapcolTall: ($) => seq(alias("!:", $.rune), $._Gap, $._hoonTall),
    zapdotTall: ($) => seq(alias("!.", $.rune), $._Gap, $._hoonTall),

    barbucWide: ($) =>
      seq(
        alias("|$", $.rune),
        "(",
        choice(
          $.name,
          seq("[", $._termWide, repeat(seq($._space, $._termWide)), "]")
        ),
        $._space,
        $._specWide,
        ")"
      ),
    barcolWide: ($) =>
      seq(alias("|:", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    bardotWide: ($) => seq(alias("|.", $.rune), "(", $._hoonWide, ")"),
    barhepWide: ($) => seq(alias("|-", $.rune), "(", $._hoonWide, ")"),
    barsigWide: ($) =>
      seq(alias("|~", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    bartarWide: ($) =>
      seq(alias("|*", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    bartisWide: ($) =>
      seq(alias("|=", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    barwutWide: ($) => seq(alias("|?", $.rune), "(", $._hoonWide, ")"),
    bucbarWide: ($) =>
      seq(alias("$|", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    buccabWide: ($) => seq(alias("$_", $.rune), "(", $._hoonWide, ")"),
    buccenWide: ($) =>
      seq(
        alias("$%", $.rune),
        "(",
        $._specWide,
        repeat(seq($._space, $._specWide)),
        ")"
      ),
    buccolWide: ($) =>
      seq(
        alias(seq("$", ":"), $.rune),
        "(",
        $._specWide,
        repeat(seq($._space, $._specWide)),
        ")"
      ),
    bucgalWide: ($) =>
      seq(alias("$<", $.rune), "(", $._specWide, $._space, $._specWide, ")"),
    bucgarWide: ($) =>
      seq(alias("$>", $.rune), "(", $._specWide, $._space, $._specWide, ")"),
    buchepWide: ($) =>
      seq(alias("$-", $.rune), "(", $._specWide, $._space, $._specWide, ")"),
    bucketWide: ($) =>
      seq(alias("$^", $.rune), "(", $._specWide, $._space, $._specWide, ")"),
    buclusWide: ($) =>
      seq(
        alias(seq("$", "+"), $.rune),
        "(",
        $._studWide,
        $._space,
        $._specWide,
        ")"
      ),
    bucpamWide: ($) =>
      seq(alias("$&", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    bucsigWide: ($) =>
      seq(alias("$~", $.rune), "(", $._hoonWide, $._space, $._specWide, ")"),
    bucpatWide: ($) =>
      seq(alias("$@", $.rune), "(", $._specWide, $._space, $._specWide, ")"),
    buctisWide: ($) =>
      seq(alias("$=", $.rune), "(", $._skinWide, $._space, $._specWide, ")"),
    bucwutWide: ($) =>
      seq(
        alias("$?", $.rune),
        "(",
        $._specWide,
        repeat(seq($._space, $._specWide)),
        ")"
      ),
    cencabWide: ($) =>
      seq(
        alias("%_", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._wingWide, $._space, $._hoonWide)),
        ")"
      ),
    cencolWide: ($) =>
      seq(
        alias("%:", $.rune),
        "(",
        $._hoonWide,
        repeat1(seq($._space, $._hoonWide)),
        ")"
      ),
    cendotWide: ($) =>
      seq(
        alias(seq("%", "."), $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    cenhepWide: ($) =>
      seq(alias("%-", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    cenketWide: ($) =>
      seq(
        alias("%^", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    cenlusWide: ($) =>
      seq(
        alias("%+", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    censigWide: ($) =>
      seq(
        alias(seq("%", "~"), $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    centarWide: ($) =>
      seq(
        alias("%*", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._wingWide, $._space, $._hoonWide)),
        ")"
      ),
    centisWide: ($) =>
      seq(
        alias("%=", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._wingWide, $._space, $._hoonWide)),
        ")"
      ),
    colhepWide: ($) =>
      seq(alias(":-", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    colcabWide: ($) =>
      seq(alias(":_", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    collusWide: ($) =>
      seq(
        alias(":+", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    colketWide: ($) =>
      seq(
        alias(":^", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    coltarWide: ($) =>
      seq(
        alias(":*", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    colsigWide: ($) =>
      seq(
        alias(":~", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    dotketWide: ($) =>
      seq(
        alias(".^", $.rune),
        "(",
        $._specWide,
        repeat1(seq($._space, $._hoonWide)),
        ")"
      ),
    dotlusWide: ($) => seq(alias(".+", $.rune), "(", $._hoonWide, ")"),
    dottarWide: ($) =>
      seq(alias(".*", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    dottisWide: ($) =>
      seq(alias(".=", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    dotwutWide: ($) => seq(alias(".?", $.rune), "(", $._hoonWide, ")"),
    ketbarWide: ($) => seq(alias("^|", $.rune), "(", $._hoonWide, ")"),
    ketcolWide: ($) => seq(alias("^:", $.rune), "(", $._specWide, ")"),
    ketdotWide: ($) =>
      seq(alias("^.", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    kethepWide: ($) =>
      seq(alias("^-", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    ketlusWide: ($) =>
      seq(alias("^+", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    ketpamWide: ($) => seq(alias("^&", $.rune), "(", $._hoonWide, ")"),
    ketsigWide: ($) => seq(alias("^~", $.rune), "(", $._hoonWide, ")"),
    kettarWide: ($) => seq(alias("^*", $.rune), "(", $._specWide, ")"),
    kettisWide: ($) =>
      seq(alias("^=", $.rune), "(", $._skinWide, $._space, $._hoonWide, ")"),
    ketwutWide: ($) => seq(alias("^?", $.rune), "(", $._hoonWide, ")"),
    miccolWide: ($) =>
      seq(
        alias(";:", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    micgalWide: ($) =>
      seq(
        alias(";<", $.rune),
        "(",
        $._specWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    miclusWide: ($) => seq(alias(";+", $.rune), "(", $._hoonWide, ")"),
    micmicWide: ($) =>
      seq(alias(";;", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    micfasWide: ($) => seq(alias(";/", $.rune), "(", $._hoonWide, ")"),
    micsigWide: ($) =>
      seq(
        alias(";~", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    mictarWide: ($) => seq(alias(";*", $.rune), "(", $._hoonWide, ")"),
    mictisWide: ($) =>
      seq(
        alias(";=", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    siggarWide: ($) =>
      seq(
        alias("~>", $.rune),
        "(",
        $._termWide,
        optional(seq(".", optional($._Gap), $._hoonWide)),
        $._space,
        $._hoonWide,
        ")"
      ),
    sigbarWide: ($) =>
      seq(alias("~|", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    sigbucWide: ($) =>
      seq(alias("~$", $.rune), "(", $._termWide, $._space, $._hoonWide, ")"),
    sigcabWide: ($) =>
      seq(alias("~_", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    siggalWide: ($) =>
      seq(
        alias("~<", $.rune),
        "(",
        $._termWide,
        optional(seq(".", optional($._Gap), $._hoonWide)),
        $._space,
        $._hoonWide,
        ")"
      ),
    siglusWide: ($) => seq(alias("~+", $.rune), "(", $._hoonWide, ")"),
    sigfasWide: ($) =>
      seq(alias("~/", $.rune), "(", $._chumTall, $._space, $._hoonWide, ")"),
    sigpamWide: ($) =>
      seq(alias("~&", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    sigtisWide: ($) =>
      seq(alias("~=", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    sigwutWide: ($) =>
      seq(
        alias("~?", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    sigzapWide: ($) =>
      seq(alias("~!", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tisgarWide: ($) =>
      seq(alias("=>", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tisbarWide: ($) =>
      seq(alias("=|", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    tiscolWide: ($) =>
      seq(
        alias("=:", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._wingWide, $._space, $._hoonWide)),
        $._space,
        $._hoonWide,
        ")"
      ),
    tiscomWide: ($) =>
      seq(alias("=,", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tisdotWide: ($) =>
      seq(
        alias("=.", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    tishepWide: ($) =>
      seq(alias("=-", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tisketWide: ($) =>
      seq(
        alias("=^", $.rune),
        "(",
        $._skinWide,
        $._space,
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    tisgalWide: ($) =>
      seq(alias("=<", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tislusWide: ($) =>
      seq(alias("=+", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    tismicWide: ($) =>
      seq(
        alias("=;", $.rune),
        "(",
        $._skinWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    tisfasWide: ($) =>
      seq(
        alias("=/", $.rune),
        "(",
        field("name", $._skinWide),
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    tissigWide: ($) =>
      seq(
        alias("=~", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    tistarWide: ($) =>
      seq(
        alias("=*", $.rune),
        "(",
        choice($._termWide, seq($.name, "=", $._specWide)),
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    tiswutWide: ($) =>
      seq(
        alias("=?", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wutbarWide: ($) =>
      seq(
        alias("?|", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    wuthepWide: ($) =>
      seq(
        alias("?-", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._specWide,
        $._space,
        $._valueWide,
        repeat(seq(",", $._space, $._specWide, $._space, $._valueWide)),
        ")"
      ),
    wutcolWide: ($) =>
      seq(
        alias(seq("?", ":"), $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wutdotWide: ($) =>
      seq(
        alias("?.", $.rune),
        "(",
        $._hoonWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wutketWide: ($) =>
      seq(
        alias("?^", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wutgalWide: ($) =>
      seq(alias("?<", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    wutgarWide: ($) =>
      seq(alias("?>", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    wutlusWide: ($) =>
      seq(
        alias("?+", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._specWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._specWide, $._space, $._hoonWide)),
        ")"
      ),
    wutpamWide: ($) =>
      seq(
        alias("?&", $.rune),
        "(",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        ")"
      ),
    wutpatWide: ($) =>
      seq(
        alias("?@", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wutsigWide: ($) =>
      seq(
        alias("?~", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    wuttisWide: ($) =>
      seq(alias("?=", $.rune), "(", $._specWide, $._space, $._wingWide, ")"),
    wutzapWide: ($) => seq(alias("?!", $.rune), "(", $._hoonWide, ")"),
    zapcomWide: ($) =>
      seq(alias("!,", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    zapgarWide: ($) => seq(alias("!>", $.rune), "(", $._hoonWide, ")"),
    zapgalWide: ($) =>
      seq(alias("!<", $.rune), "(", $._specWide, $._space, $._hoonWide, ")"),
    zapmicWide: ($) =>
      seq(alias("!;", $.rune), "(", $._hoonWide, $._space, $._hoonWide, ")"),
    zaptisWide: ($) =>
      prec(1, seq(alias(seq("!", "="), $.rune), "(", $._hoonWide, ")")),
    zapwutWide: ($) =>
      prec(
        1,
        seq(
          alias(seq("!", "?"), $.rune),
          "(",
          choice($.number, seq("[", $.number, $._space, $.number, "]")),
          $._space,
          $._hoonWide,
          ")"
        )
      ),
    zappatWide: ($) =>
      seq(
        alias("!@", $.rune),
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        $._space,
        $._hoonWide,
        ")"
      ),
    zapcolWide: ($) => seq(alias("!:", $.rune), "(", $._hoonWide, ")"),
    zapdotWide: ($) => seq(alias("!.", $.rune), "(", $._hoonWide, ")"),
    zapzap: ($) => alias("!!", $.rune),

    structure: ($) =>
    prec(0, 
      choice(
        $.bucbarTall,
        $.buccabTall,
        $.buccenTall,
        $.buccolTall,
        $.bucgalTall,
        $.bucgarTall,
        $.buchepTall,
        $.bucketTall,
        $.buclusTall,
        $.bucpamTall,
        $.bucsigTall,
        $.bucpatTall,
        $.buctisTall,
        $.bucwutTall
      )),
    call: ($) =>
      choice(
        $.cencabTall,
        $.cencolTall,
        $.cendotTall,
        $.cenhepTall,
        $.cenketTall,
        $.cenlusTall,
        $.censigTall,
        $.centarTall,
        $.centisTall
      ),
    cellMaker: ($) =>
      choice(
        $.colhepTall,
        $.colcabTall,
        $.collusTall,
        $.colketTall,
        $.coltarTall,
        $.colsigTall
      ),
    nock: ($) =>
      choice(
        $.dotketTall,
        $.dotlusTall,
        $.dottarTall,
        $.dottisTall,
        $.dotwutTall
      ),

    import: ($) =>
      choice(
        $.faslusTall,
        $.fashepTall,
        $.fastisTall,
        $.fastarTall,
        $.fasbucTall,
        $.fassigTall,
        $.fascenTall,
        $.faswutTall
      ),

    casts: ($) =>
      choice(
        $.ketbarTall,
        $.ketcolTall,
        $.ketdotTall,
        $.kethepTall,
        $.ketlusTall,
        $.ketpamTall,
        $.ketsigTall,
        $.kettarTall,
        $.kettisTall,
        $.ketwutTall
      ),
    macros: ($) =>
      choice(
        $.miccolTall,
        $.micgalTall,
        $.miclusTall,
        $.micmicTall,
        $.micfasTall,
        $.micsigTall,
        $.mictarTall,
        $.mictisTall
      ),

    hints: ($) =>
      choice(
        $.siggarTall,
        $.sigbarTall,
        $.sigbucTall,
        $.sigcabTall,
        $.sigcenTall,
        $.siggalTall,
        $.siglusTall,
        $.sigfasTall,
        $.sigpamTall,
        $.sigtisTall,
        $.sigwutTall,
        $.sigzapTall
      ),

    subject: ($) =>
      choice(
        $.tisgarTall,
        $.tisbarTall,
        $.tiscolTall,
        $.tiscomTall,
        $.tisdotTall,
        $.tishepTall,
        $.tisketTall,
        $.tisgalTall,
        $.tislusTall,
        $.tismicTall,
        $.tisfasTall,
        $.tissigTall,
        $.tistarTall,
        $.tiswutTall
      ),

    conditionals: ($) =>
      choice(
        $.wutbarTall,
        $.wuthepTall,
        $.wutcolTall,
        $.wutdotTall,
        $.wutketTall,
        $.wutgalTall,
        $.wutgarTall,
        $.wutlusTall,
        $.wutpamTall,
        $.wutpatTall,
        $.wutsigTall,
        $.wuttisTall,
        $.wutzapTall
      ),
    wild: ($) =>
      choice(
        $.zapcomTall,
        $.zapgarTall,
        $.zapgalTall,
        $.zapmicTall,
        $.zaptisTall,
        $.zapwutTall,
        $.zappatTall,
        $.zapcolTall,
        $.zapdotTall
      ),

    _irregularForms: ($) =>
      choice(
        $.normalize,
        $.wrapFace,
        $.wrapFace2,
        $.typeUnion,
        $.gateCall,
        $.pullArmInDoor,
        $.resolveWingWithChanges,
        $.cell,
        $.increment,
        $.equality,
        $.typeCast,
        $.bunt,
        $.factoryGate,
        $.twoArgstoN,
        $.composeExpressions,
        $.logicalOr,
        $.logicalAnd,
        $.logicalNot,
        $.addCell,
        $.appendCell,
        $.nullList,
        $.tank,
        $.tankTape,
        $.parent
      ),

    normalize: ($) => prec.left(2, seq("_", $._hoonWide)),
    wrapFace: ($) => seq($._skinWide, "=", $._hoonWide),
    wrapFace2: ($) => seq("=", $._specWide),
    typeUnion: ($) =>
      seq("?", "(", $._specWide, repeat(seq($._space, $._specWide)), ")"),
    gateCall: ($) =>
      seq("(", $._hoonWide, repeat(seq($._space, $._hoonWide)), ")"),
    pullArmInDoor: ($) =>
      seq(
        "~(",
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat1(seq($._space, $._hoonWide)),
        ")"
      ),
    resolveWingWithChanges: ($) =>
      seq(
        $._wingWide,
        "(",
        $._wingWide,
        $._space,
        $._hoonWide,
        repeat(seq(",", $._space, $._wingWide, $._space, $._hoonWide)),
        ")"
      ),
    cell: ($) =>
      seq(
        optional("~"),
        "[",
        $._hoonWide,
        repeat(seq($._space, $._hoonWide)),
        "]",
        optional("~")
      ),
    increment: ($) => seq("+", "(", $._hoonWide, ")"),
    equality: ($) =>
      prec(1, seq("=", "(", $._hoonWide, $._space, $._hoonWide, ")")),
    typeCast: ($) => seq("`", $._specWide, "`", $._hoonWide), //`specWide`hoonWide
    nullList: ($) => prec(1, seq("`", $._hoonWide)),
    bunt: ($) => prec(1, seq("*", $._specWide)),
    factoryGate: ($) => prec(1, seq(",", $._specWide)),
    twoArgstoN: ($) =>
      seq(":(", $._hoonWide, repeat1(seq($._space, $._hoonWide)), ")"),
    composeExpressions: ($) =>
      prec(3, seq($._hoonWide, repeat1(seq(":", $._hoonWide)))),
    logicalOr: ($) =>
      seq("|(", $._hoonWide, repeat(seq($._space, $._hoonWide)), ")"),
    logicalAnd: ($) =>
      seq("&(", $._hoonWide, repeat(seq($._space, $._hoonWide)), ")"),
    logicalNot: ($) => prec.left(2, seq("!", $._hoonWide)),
    addCell: ($) =>
      seq(choice($.name, $.boolean, $.number), choice("+", "/"), $._hoonWide),
    appendCell: ($) =>
      prec(3, seq($._hoonWide, repeat1(seq("^", $._hoonWide)))),
    tank: ($) => seq(">", $._hoonWide, repeat(seq($._space, $._hoonWide)), "<"),
    tankTape: ($) =>
      seq("<", $._hoonWide, repeat(seq($._space, $._hoonWide)), ">"),
    parent: ($) => seq(repeat1("^"), $.name),

    _value: ($) =>
      choice(
        $.term,
        $.name,
        $.number,
        $.boolean,
        $.mold,
        $.aura,
        $.fullContext,
        $.stripFace,
        $.lark,
        $.string,
        $.date,
        $.wingPath,
        $.specialIndex,
        $.path,
        $.ipAddress,
        $.unicode,
        $.bitcoinAddress,
        $.phonemic
      ),

    lineComment: ($) => seq(optional($._space), "::", /[^\n]*/),
    name: ($) => choice("$", /[a-zA-Z][a-zA-Z0-9-]*/),
    number: ($) =>
      prec.right(
        0,
        choice(
          seq(
            optional(choice("--", "-")),
            choice(
              seq(/[0-9]{1,3}/, repeat(seq(".", optional($._Gap), /[0-9]{3}/))), //@ud
              seq(
                /0x[0-9a-fA-F]{1,4}/,
                repeat(seq(".", optional($._Gap), /[0-9a-fA-F]{4}/))
              ), //@ux
              seq(/0b[01]{1,4}/, repeat(seq(".", optional($._Gap), /[01]{4}/))), //@ub
              /0i[0-9]+/, //@ui
              seq(
                /0v[0-9a-v]{1,5}/,
                repeat(seq(".", optional($._Gap), /[0-9a-v]{5}/))
              ), //@uv
              seq(
                /0w[0-9a-zA-Z-~]{1,5}/,
                repeat(seq(".", optional($._Gap), /[0-9a-zA-Z-~]{5}/))
              ) //@uw
            )
          ),
          seq(".", optional(choice("~", "~~", "~~~")), /[0-9]+(.[0-9]+)?/) //@rh,@rs,@rd,@rq
        )
      ),
    ipAddress: ($) =>
      seq(
        ".",
        choice(
          /[0-9]{1,4}(\.[0-9]{1,4}){3}/, //@if
          /[0-9a-f]{1,4}(\.[0-9a-f]{1,4}){7}/ //@is
        )
      ),
    bitcoinAddress: ($) => seq("0c", /[13][a-km-zA-HJ-NP-Z1-9]{25,34}/), //@p
    phonemic: ($) =>
      seq(
        optional("."),
        "~",
        /[bcdfghjklmnpqrstvwxz][aeiou][bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz][aeiouy][bcdfghjklmnpqrstvwxz](-[bcdfghjklmnpqrstvwxz][aeiou][bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz][aeiouy][bcdfghjklmnpqrstvwxz]){0,3}/
      ), //@q
    unicode: ($) => seq("~-~", /(\w|\.)+/),
    boolean: ($) => choice("&", "|", ".y", ".n"),
    mold: ($) => choice("?", "^", "~", "*"),
    term: ($) =>
      choice(
        seq(
          "%",
          choice(
            $.name,
            $.number,
            $.date,
            seq("'", /[^\n']*/, "'"),
            $.knot,
            "~",
            $.ipAddress,
            $.bitcoinAddress,
            $.boolean,
            $.unicode,
            $.phonemic
          )
        )
      ),
    aura: ($) => /@[a-zA-Z]*/,
    _space: ($) => " ",
    _Gap: ($) => repeat1(/ *\n+ *|  +/),
    fullContext: ($) => ".",
    stripFace: ($) => ",",
    lark: ($) => choice("+", "-", /(([-+][<>])+)|([-+]([<>][-+])+)/),
    knot: ($) => seq("~.", /[0-9a-zA-Z~_.-]*/),
    string: ($) => choice($.tapeOrCord, $.knot),
    date: ($) =>
      seq(
        choice(
          /~[dhms]\d+(\.[dhms]\d+)*/, //day.hour.min.second
          /~\d+\.\d+\.\d+(\.(\.\d+){3})?/
        ), //year month day
        optional(/\.(\.[0-9a-f]{4})+/)
      ),
    specialIndex: ($) => seq(choice("+", "|", "&"), /[0-9]+/),
    wingPath: ($) =>
      prec.left(
        0,
        seq(
          choice(
            $.lark,
            $.fullContext,
            $.name,
            $.parent,
            $.specialIndex,
            $.stripFace
          ),
          repeat1(
            seq(
              ".",
              choice(
                $.lark,
                $.fullContext,
                $.name,
                $.parent,
                $.specialIndex,
                $.stripFace
              )
            )
          )
        )
      ),
    path: ($) =>
      seq(
        optional("%"),
        choice(
          "/",
          repeat1(
            seq(
              repeat1("/"),
              choice(
                $.name,
                $.cell,
                $.gateCall,
                $.number,
                $.tapeOrCord,
                $.knot,
                $.date
              )
            )
          )
        )
      ),
    seriesTerminator: ($) => "==",
    coreTerminator: ($) => "--",

    _tapeOrCord: ($) =>
      seq(
        $._stringStart,
        repeat(choice($.interpolation, $.stringContent)),
        $._stringEnd
      ),
    tapeOrCord: ($) =>
      seq($._tapeOrCord, optional(repeat(seq(".", $._tapeOrCord)))),
    interpolation: ($) => seq("{", $._hoonWide, "}"),
  },
  extras: ($) => [$.lineComment],
  conflicts: ($) => [
    [$.mold, $.parent],
    [$.buclusTall, $.buclusWide, $.name],
    [$._specWide, $._value],
    [$._irregularForms, $._specWide],
    [$._wingWide, $._value],
    [$._irregularForms, $._wingWide],
    [$._runeWide, $._specWide],
    [$.wutcolTall, $.wutcolWide, $.mold],
    [$._value, $.mold, $._wingWide],
    [$.lustarTall],
    [$._specWide, $._skinWide],
    [$._skinWide],
    [$.buccolTall, $.buccolWide, $.name],
    [$._skinWide, $._irregularForms],
    [$._skinWide, $._value, $._specWide],
    [$.buccolWide, $.name],
    [$.buclusWide, $.name],
    [$.wutcolWide, $.mold],
    [$._skinWide, $._value],
    [$.increment, $.lark],
    [$.wrapFace2, $._specWide],
    [$._specWide, $.factoryGate],
    [$._runeWide, $._wingWide],
    [$.path],
    [$.censigTall, $.term],
    [$.censigWide, $.term],
    [$.typeUnion, $.mold],
    [$._termWide, $.wingPath],
    [$.wingPath],
  ],
  externals: ($) => [$.indent, $._stringStart, $.stringContent, $._stringEnd],
});
