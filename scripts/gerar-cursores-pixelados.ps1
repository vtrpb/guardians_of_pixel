Add-Type -AssemblyName System.Drawing

$raizDoProjeto = Split-Path -Parent $PSScriptRoot
$diretorioDeAssets = Join-Path $raizDoProjeto "assets"
$escalaDoPixel = 2

function Nova-Cor([string]$hexadecimal) {
    return [System.Drawing.ColorTranslator]::FromHtml($hexadecimal)
}

function Preencher-PoligonoPixelado($grafico, $cor, [array]$pontos) {
    $pontosEscalados = [System.Drawing.Point[]]($pontos | ForEach-Object {
        [System.Drawing.Point]::new(
            [int]($_[0] * $escalaDoPixel),
            [int]($_[1] * $escalaDoPixel)
        )
    })
    $pincel = [System.Drawing.SolidBrush]::new($cor)
    $grafico.FillPolygon($pincel, $pontosEscalados)
    $pincel.Dispose()
}

function Preencher-BlocoPixelado($grafico, $cor, [int]$x, [int]$y, [int]$largura, [int]$altura) {
    $pincel = [System.Drawing.SolidBrush]::new($cor)
    $grafico.FillRectangle(
        $pincel,
        $x * $escalaDoPixel,
        $y * $escalaDoPixel,
        $largura * $escalaDoPixel,
        $altura * $escalaDoPixel
    )
    $pincel.Dispose()
}

function Criar-BaseDoCursor() {
    $imagem = [System.Drawing.Bitmap]::new(
        32,
        32,
        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    $grafico = [System.Drawing.Graphics]::FromImage($imagem)
    $grafico.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $grafico.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
    $grafico.Clear([System.Drawing.Color]::Transparent)
    return @{ Imagem = $imagem; Grafico = $grafico }
}

function Salvar-Cursor($base, [string]$nomeDoArquivo) {
    $destino = Join-Path $diretorioDeAssets $nomeDoArquivo
    $base.Imagem.Save($destino, [System.Drawing.Imaging.ImageFormat]::Png)
    $base.Grafico.Dispose()
    $base.Imagem.Dispose()
}

$contorno = Nova-Cor "#07150f"
$branco = Nova-Cor "#f7f7f2"
$brilhoBranco = Nova-Cor "#ffffff"
$sombraCinza = Nova-Cor "#aeb7ba"
$dourado = Nova-Cor "#f5cf57"
$sombraDourada = Nova-Cor "#8a6922"
$vermelho = Nova-Cor "#ef5b61"
$sombraVermelha = Nova-Cor "#8f2936"
$ciano = Nova-Cor "#67e5db"
$cinzaClaro = Nova-Cor "#e9ece8"
$cinza = Nova-Cor "#747984"

$seta = Criar-BaseDoCursor
Preencher-PoligonoPixelado $seta.Grafico $contorno @(
    @(1, 0), @(4, 0), @(4, 2), @(6, 2), @(6, 4), @(8, 4),
    @(8, 6), @(10, 6), @(10, 8), @(12, 8), @(12, 11), @(8, 11),
    @(8, 12), @(9, 12), @(9, 14), @(10, 14), @(10, 16), @(6, 16),
    @(6, 14), @(5, 14), @(5, 12), @(4, 12), @(4, 13), @(3, 13),
    @(3, 14), @(1, 14)
)
Preencher-PoligonoPixelado $seta.Grafico $branco @(
    @(2, 2), @(3, 2), @(3, 3), @(5, 3), @(5, 5), @(7, 5),
    @(7, 7), @(9, 7), @(9, 9), @(10, 9), @(10, 10), @(6, 10),
    @(6, 11), @(7, 11), @(7, 13), @(8, 13), @(8, 14), @(7, 14),
    @(7, 13), @(6, 13), @(6, 11), @(5, 11), @(5, 9), @(4, 9),
    @(4, 10), @(3, 10), @(3, 11), @(2, 11)
)
Preencher-BlocoPixelado $seta.Grafico $brilhoBranco 2 2 1 7
Preencher-BlocoPixelado $seta.Grafico $sombraCinza 4 5 2 4
Salvar-Cursor $seta "cursor-pixel-seta.png"

$mao = Criar-BaseDoCursor
Preencher-PoligonoPixelado $mao.Grafico $contorno @(
    @(5, 0), @(9, 0), @(9, 4), @(11, 4), @(11, 5), @(13, 5),
    @(13, 7), @(15, 7), @(15, 13), @(13, 13), @(13, 15), @(4, 15),
    @(4, 14), @(3, 14), @(3, 12), @(2, 12), @(2, 10), @(0, 10),
    @(0, 6), @(3, 6), @(3, 8), @(4, 8), @(4, 2), @(5, 2)
)
Preencher-PoligonoPixelado $mao.Grafico $branco @(
    @(6, 1), @(8, 1), @(8, 9), @(9, 9), @(9, 5), @(10, 5),
    @(10, 10), @(11, 10), @(11, 6), @(12, 6), @(12, 11), @(13, 11),
    @(13, 8), @(14, 8), @(14, 12), @(12, 12), @(12, 14), @(5, 14),
    @(5, 13), @(4, 13), @(4, 11), @(3, 11), @(3, 9), @(2, 9),
    @(2, 7), @(3, 7), @(3, 9), @(5, 9), @(5, 2), @(6, 2)
)
Preencher-BlocoPixelado $mao.Grafico $brilhoBranco 6 1 1 7
Preencher-BlocoPixelado $mao.Grafico $brilhoBranco 2 7 1 1
Preencher-BlocoPixelado $mao.Grafico $sombraCinza 5 10 7 3
Preencher-BlocoPixelado $mao.Grafico $dourado 5 14 7 2
Preencher-BlocoPixelado $mao.Grafico $sombraDourada 6 14 5 1
Salvar-Cursor $mao "cursor-pixel-mao.png"

$construcao = Criar-BaseDoCursor
Preencher-PoligonoPixelado $construcao.Grafico $contorno @(
    @(0, 1), @(10, 1), @(10, 3), @(11, 3), @(11, 6),
    @(9, 6), @(9, 8), @(11, 8), @(11, 10), @(13, 10),
    @(13, 12), @(15, 12), @(15, 16), @(12, 16), @(12, 14),
    @(10, 14), @(10, 12), @(8, 12), @(8, 10), @(6, 10),
    @(6, 7), @(4, 7), @(4, 6), @(0, 6)
)
Preencher-BlocoPixelado $construcao.Grafico $cinzaClaro 1 2 9 3
Preencher-BlocoPixelado $construcao.Grafico $cinza 1 5 7 1
Preencher-PoligonoPixelado $construcao.Grafico $dourado @(
    @(7, 6), @(9, 6), @(9, 9), @(11, 9), @(11, 11),
    @(13, 11), @(13, 13), @(14, 13), @(14, 15), @(13, 15),
    @(13, 14), @(11, 14), @(11, 12), @(9, 12), @(9, 10),
    @(7, 10)
)
Salvar-Cursor $construcao "cursor-pixel-construcao.png"

$invalido = Criar-BaseDoCursor
Preencher-PoligonoPixelado $invalido.Grafico $contorno @(
    @(2, 0), @(8, 6), @(14, 0), @(16, 2), @(10, 8),
    @(16, 14), @(14, 16), @(8, 10), @(2, 16), @(0, 14),
    @(6, 8), @(0, 2)
)
Preencher-PoligonoPixelado $invalido.Grafico $vermelho @(
    @(3, 2), @(8, 7), @(13, 2), @(14, 3), @(9, 8),
    @(14, 13), @(13, 14), @(8, 9), @(3, 14), @(2, 13),
    @(7, 8), @(2, 3)
)
Preencher-BlocoPixelado $invalido.Grafico $sombraVermelha 7 7 2 2
Salvar-Cursor $invalido "cursor-pixel-invalido.png"

$mira = Criar-BaseDoCursor
Preencher-BlocoPixelado $mira.Grafico $contorno 7 0 2 5
Preencher-BlocoPixelado $mira.Grafico $contorno 7 11 2 5
Preencher-BlocoPixelado $mira.Grafico $contorno 0 7 5 2
Preencher-BlocoPixelado $mira.Grafico $contorno 11 7 5 2
Preencher-BlocoPixelado $mira.Grafico $contorno 5 5 6 6
Preencher-BlocoPixelado $mira.Grafico $ciano 7 1 1 4
Preencher-BlocoPixelado $mira.Grafico $ciano 8 11 1 4
Preencher-BlocoPixelado $mira.Grafico $ciano 1 7 4 1
Preencher-BlocoPixelado $mira.Grafico $ciano 11 8 4 1
Preencher-BlocoPixelado $mira.Grafico $vermelho 7 7 2 2
Salvar-Cursor $mira "cursor-pixel-mira.png"

$explosivo = Criar-BaseDoCursor
Preencher-BlocoPixelado $explosivo.Grafico $contorno 2 5 12 10
Preencher-BlocoPixelado $explosivo.Grafico $contorno 5 3 6 3
Preencher-BlocoPixelado $explosivo.Grafico $cinza 3 6 10 8
Preencher-BlocoPixelado $explosivo.Grafico $cinzaClaro 4 7 4 3
Preencher-BlocoPixelado $explosivo.Grafico $vermelho 9 7 3 3
Preencher-BlocoPixelado $explosivo.Grafico $dourado 6 4 4 2
Preencher-BlocoPixelado $explosivo.Grafico $contorno 8 1 5 3
Preencher-BlocoPixelado $explosivo.Grafico $dourado 9 2 3 1
Preencher-BlocoPixelado $explosivo.Grafico $vermelho 12 0 2 2
Salvar-Cursor $explosivo "cursor-pixel-explosivo.png"

Write-Output "Seis cursores pixelados gerados em assets."
