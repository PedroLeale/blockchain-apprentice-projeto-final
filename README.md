# Blockchain-apprentice-projeto-final

- Nosso projeto é a DAO(Decentralized Autonomous Organization) de uma farmácia que gerencia um contrato de tokens de receitas de remédios.
- Os metadados dos tokens está sendo armazenado no bucket S3.


## SmartContract

- Nosso contrato gerencia as receitas e as prescrições médicas, usando o contrato Prescription como token ERC1155.
- A gerência é feita de seguinte maneira, o dono do contrato é o dono da farmácia e ele pode adicionar e remover médicos e farmacêuticos.
- Os médicos podem propor prescrições e os farmacêuticos aprovaram ou rejeitaram as prescrições. Além disso os farmacêuticos também podem adicionar e remover tokens de prescrição ao estoque.
- Quando uma prescrição é proposta, ela é transferida para um paciente no estado *PENDING*. Esse estado funciona como uma "reserva do estoque". Assim que a prescrição é aprovada, o estado é alterado para *APPROVED* e o paciente pode retirar o remédio. Ao retirar o remédio da farmácia o novo estado será alterado para *DELIVERED*.
- No momento em que uma prescrição é rejeitada o token é transferido devolta para o estoque, ou seja, para este contrato.
- Prescrições podem ser rejeitadas em caso de incoerência ou falta de estoque físico.

## Back End

- Nosso back end gerencia rotas e retorna uma url pre-assinada para acessar as operações do bucket S3.

## Front End

- É uma aplicação feita no react.