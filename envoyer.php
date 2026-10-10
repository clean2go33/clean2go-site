<?php
// Clean2Go — réception du formulaire de devis. Aucun stockage, aucun traceur.
header('Cache-Control: no-store');
$json = (stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false);
function fin($ok, $code = 200) {
    global $json;
    if ($json) { header('Content-Type: application/json; charset=utf-8'); http_response_code($code); echo json_encode(['ok' => $ok]); exit; }
    header('Location: ' . ($ok ? '/merci/' : '/contact/?erreur=1'), true, 303); exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fin(false, 405);
// Anti-spam : champ piège
if (!empty($_POST['site_web'])) fin(true);
// Limitation simple : 1 envoi / 30 s par session
session_start();
if (isset($_SESSION['dernier']) && time() - $_SESSION['dernier'] < 30) fin(false, 429);
function nettoie($v, $max = 2000) {
    $v = trim((string)$v);
    $v = str_replace(["\r", "\n"], ' ', $v);
    return mb_substr(strip_tags($v), 0, $max);
}
function nettoie_long($v, $max = 4000) { return mb_substr(strip_tags(trim((string)$v)), 0, $max); }
$nom = nettoie($_POST['nom'] ?? '', 120);
$tel = nettoie($_POST['telephone'] ?? '', 40);
$email = nettoie($_POST['email'] ?? '', 160);
$commune = nettoie($_POST['commune'] ?? '', 80);
$presta = nettoie($_POST['prestation'] ?? '', 120);
$vehicule = nettoie($_POST['vehicule'] ?? '', 160);
$societe = nettoie($_POST['societe'] ?? '', 160);
$activite = nettoie($_POST['activite'] ?? '', 160);
$nbv = nettoie($_POST['nb_vehicules'] ?? '', 40);
$freq = nettoie($_POST['frequence'] ?? '', 80);
$message = nettoie_long($_POST['message'] ?? '');
$consent = ($_POST['consentement'] ?? '') === 'oui';
if ($nom === '' || $tel === '' || $commune === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) fin(false, 422);

$to = 'contact@clean2go.fr';
$sujet = '=?UTF-8?B?' . base64_encode('Demande de devis Clean2Go — ' . $commune) . '?=';
$corps = "Nouvelle demande depuis le site Clean2Go\n\n"
       . "Nom : $nom\nTéléphone : $tel\nE-mail : $email\nCommune : $commune\n"
       . "Prestation : " . ($presta ?: 'non précisée') . "\nVéhicule : " . ($vehicule ?: 'non précisé') . "\n" . ($societe !== '' ? "Société : $societe\nActivité : $activite\nNb véhicules : $nbv\nFréquence : $freq\n" : '') . "\nMessage :\n" . ($message ?: '(aucun)') . "\n";
// L'expéditeur est une adresse du domaine (meilleure délivrabilité) ; la réponse part vers le client.
$headers = "From: Site Clean2Go <contact@clean2go.fr>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\nX-Mailer: PHP\r\n";
$ok = mail($to, $sujet, $corps, $headers);
if ($ok) $_SESSION['dernier'] = time();
fin($ok, $ok ? 200 : 500);
