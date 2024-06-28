<?php
    
    require_once("TCPDF/tcpdf.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "Erro ao decodificar JSON.";
        exit;
    }

    $fullname = $data['fullname'];
    $email = $data['email'];
    $phone = $data['phone'];
    $sex = $data['sex'];
    $birth = $data['birth'];
    $graduated = $data['graduated'];
    $graduated_o_array = $data['graduated_o_array'];

    // Crie uma nova instância do TCPDF
    $pdf = new TCPDF();

    // Configure o PDF
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Seu Nome');
    $pdf->SetTitle('Dados do Formulário');
    $pdf->SetSubject('Dados Convertidos em PDF');
    $pdf->SetKeywords('PDF, Formulário, PHP');

    // Adicione uma página
    $pdf->AddPage();

    // Defina o conteúdo do PDF
    $html = "
    <h1>Dados do Formulário</h1>
    <p><strong>Nome:</strong> $fullname</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Telefone:</strong> $phone</p>
    <p><strong>Sexo:</strong> $sex</p>
    <p><strong>Data de Nascimento:</strong> $birth</p>
    <h2>Graduações</h2>
    <ul>
    ";

    foreach ($graduated as $item) {
        $html .= "<li>" . htmlspecialchars($item) . "</li>";
    }

    $html .= "</ul>
    <h2>Experiências</h2>
    <ul>
    ";

    foreach ($graduated_o_array as $item) {
        $html .= "<li>" . htmlspecialchars($item) . "</li>";
    }

    $html .= "</ul>";

    // Escreva o HTML no PDF
    $pdf->writeHTML($html, true, false, true, false, '');

    // Saída do PDF
    $pdf->Output('formulario.pdf', 'D'); // 'D' para download

?>
