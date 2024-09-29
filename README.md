# Blockchain-apprentice-projeto-final

- Nosso projeto é a DAO(Decentralized Autonomous Organization) de uma farmácia que gerencia um contrato de tokens de receitas de remédios.
- Este projeto tinha dois objetivos: 
  - Mostrar que blockchain não é apenas sobre transferências monetárias e pode, sim, ser utilizado para gerenciamento, aproveitando-se das provas de verdade oferecidas pela rede. 
  - Além disso, buscava resolver outro problema comum em farmácias: receitas feitas de forma incorreta por falta de validação entre farmacêutico e médico. Os usuários finais, ou seja, os pacientes, só precisam fornecer seus endereços públicos, sem a necessidade de lidar com aplicações complicadas.

![Logo](/logo.png)

## SmartContract

- Nosso contrato gerencia as receitas e as prescrições médicas, usando o contrato Prescription como token ERC1155.
- A gerência é feita de seguinte maneira, o dono do contrato pode adicionar e remover médicos e farmacêuticos.
- Os médicos podem propor prescrições e os farmacêuticos aprovaram ou rejeitaram as prescrições. Além disso os farmacêuticos também podem adicionar e remover tokens de prescrição ao estoque.
- Quando uma prescrição é proposta, ela é transferida para um paciente no estado *PENDING*. Esse estado funciona como uma "reserva do estoque". Assim que a prescrição é aprovada, o estado é alterado para *APPROVED* e o paciente pode retirar o remédio. Ao retirar o remédio da farmácia o novo estado será alterado para *DELIVERED*.
- No momento em que uma prescrição é rejeitada o token é transferido devolta para o estoque, ou seja, para o contrato da DAO.
- Prescrições podem ser rejeitadas em caso de incoerência nos metadados ou falta de estoque físico.

## Detalhes do projeto

- Os contratos foram feitos utilizando o framework [Foundry](https://book.getfoundry.sh/), escritos em [Solidity](https://soliditylang.org/) e feito deploy na rede Hyperledger Besu, em um nodo RPC disponibilizado pela Compass UOL.
- A aplicação front-end foi desenvolvida em [React](https://react.dev/) e implantada no AWS Amplify, e os metadados dos tokens foram armazenados em Buckets S3. A aplicação React acessa o bucket S3 por meio de URLs pré-assinadas, geradas por uma função Lambda em seu back-end, função que também foi implantada em outro bucket S3.
- Para produção, a única mudança necessária seria o uso de uma rede IPFS privada para a Hyperledger Besu, a fim de armazenar os metadados dos tokens em vez de utilizar um bucket S3.