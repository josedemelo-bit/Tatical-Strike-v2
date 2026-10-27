# Tactical Strike — FPS tático para navegador

Protótipo original em primeira pessoa com cenário 3D, mira, rifle, disparos, recarga, HUD, colisões simples, bots e sincronização multiplayer básica via Socket.IO.

## Requisitos
- Node.js 18 ou mais recente
- Navegador atualizado com suporte a WebGL
- Conexão à internet para carregar Three.js pelo CDN (as músicas dos jogadores ficam no navegador de cada um)

## Executar no PC
1. Extraia o ZIP.
2. Abra um terminal dentro da pasta `tactical_strike_web`.
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm start`
5. Abra `http://localhost:3000` no navegador.
6. Clique em **TREINO COM BOTS** para jogar offline, ou **SALA ONLINE** para testar a conexão multiplayer.

O servidor serve o jogo a partir da pasta `public/`.

## Música (cada jogador usa as próprias)
O jogo **não traz músicas**. Cada jogador adiciona as suas direto no menu:

1. Clique em **＋ ADICIONAR MÚSICAS** e escolha um ou mais arquivos de áudio (MP3, M4A, OGG, WAV, FLAC).
2. Escolha onde tocar: **Menu e partida**, **Só no menu** ou **Só na partida**.
3. Para tirar uma música da lista, clique no **✕** ao lado dela.

Os arquivos ficam **somente no navegador do jogador** (IndexedDB) e continuam lá nas próximas visitas. Eles **não são enviados ao servidor** nem aos outros jogadores, então não há distribuição de música e o repositório não precisa de nenhum MP3. Se o navegador não permitir salvar (ex.: navegação privada), as músicas valem só até fechar a página.

**Capa do álbum:** o jogo lê a imagem de capa que já vem embutida no arquivo (tags ID3 de MP3, MP4/M4A e FLAC) e mostra no menu, no HUD e na lista de músicas. A leitura é feita no próprio navegador, sem bibliotecas e sem enviar nada. Arquivos sem capa embutida (ou em formatos como OGG e WAV) simplesmente não mostram imagem.

A playlist de cada modo toca em sequência e repete. Ao iniciar a partida, o jogo troca para a playlist de gameplay; ao clicar em **MENU**, volta para a do menu. Há controles de ligar/desligar e volume no menu e no HUD. Arquivos que o navegador não consegue tocar são pulados.

Navegadores bloqueiam áudio antes de uma interação do usuário; a reprodução é liberada no primeiro clique, toque ou tecla.

**Músicas embutidas (opcional):** se quiser incluir faixas **livres de direitos** junto do jogo, coloque os arquivos em `public/audio/`, liste-os em `musicTracks` no `public/index.html` e remova as linhas de áudio do `.gitignore`. Não publique músicas comerciais em um repositório ou site público.

## Colocar online para jogar com amigos
1. Publique a pasta do projeto em um host que aceite Node.js e WebSockets (por exemplo, um VPS ou serviço de hospedagem Node).
2. Configure a porta conforme a variável de ambiente `PORT`.
3. No jogo, preencha o endereço público do servidor e clique em **SALA ONLINE**.
4. Todos os jogadores precisam usar o mesmo endereço público.

## Controles
- `W A S D`: movimentação
- `Mouse`: mirar
- `Clique esquerdo`: disparar
- `Shift`: correr
- `R`: recarregar
- `Esc`: liberar o cursor
- Botão **MENU** no HUD: voltar ao menu

## Limitações honestas deste protótipo
- O visual 3D é um ponto de partida, não equivale ao nível de produção de Counter-Strike 2.
- O multiplayer sincroniza posições e mensagens de disparo em uma implementação inicial; não sincroniza ainda dano, munição, bots ou placar entre clientes.
- Para um jogo competitivo real, ainda seriam necessários movimento e combate autoritativos no servidor, interpolação, validação anticheat, salas, equipes, objetivos, sons, animações, modelos/texturas próprios, testes de rede e segurança.
- O mapa e os personagens usam formas 3D simples e materiais procedurais.
- O jogo usa Three.js pelo CDN; é necessária internet para carregar a biblioteca.

## Estrutura
- `public/index.html`: jogo 3D e controle de música
- `public/audio/`: pasta opcional para faixas livres de direitos (MP3 e afins são ignorados pelo Git por padrão)
- `server.js`: servidor HTTP + Socket.IO
- `package.json`: dependências e comando de inicialização
